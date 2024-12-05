import amqp, { Channel, Connection, ConsumeMessage } from "amqplib";
import { CareTasks } from "./models/CareTask"; // Đảm bảo rằng bạn đã định nghĩa model CareTask

const RABBITMQ_URL = "amqp://guest:guest@localhost"; // URL kết nối đến RabbitMQ
const QUEUE_NAME = "careTaskQueue"; // Tên hàng đợi mà bạn muốn tiêu thụ thông điệp từ đó

let channel: Channel | null = null;
let connection: Connection | null = null;

// Kết nối đến RabbitMQ và tiêu thụ dữ liệu từ hàng đợi
async function startRabbitMQ() {
    try {
        // Kết nối đến RabbitMQ server
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();

        // Đảm bảo rằng hàng đợi tồn tại
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        console.log(`Đang chờ nhận thông điệp từ hàng đợi ${QUEUE_NAME}...`);

        // Xử lý các thông điệp nhận được
        channel.consume(QUEUE_NAME, (message: ConsumeMessage | null) => {
            if (message) {
                const content = message.content.toString();
                console.log("Nhận thông điệp từ RabbitMQ:", content);

                // Parse JSON nếu cần thiết
                try {
                    const jsonMessage: CareTasks = JSON.parse(content);
                    console.log("Thông điệp JSON đã parse:", jsonMessage);

                    // Lưu vào DB hoặc xử lý thông điệp này tại đây
                    // Ví dụ: Giả sử bạn có một hàm saveCareTask để lưu vào cơ sở dữ liệu
                    saveCareTask(jsonMessage);

                } catch (error) {
                    console.error("Không thể parse JSON:", error);
                }

                // Xác nhận đã nhận và xử lý thông điệp
                channel?.ack(message);
            }
        }, { noAck: false });
    } catch (error) {
        console.error("Lỗi khi kết nối đến RabbitMQ:", error);
    }
}

// Ví dụ hàm để lưu CareTask vào cơ sở dữ liệu
async function saveCareTask(careTask: CareTasks) {
    // Thực hiện logic lưu vào DB ở đây
    console.log("Lưu CareTask vào cơ sở dữ liệu:", careTask);
}

// Đảm bảo ngắt kết nối RabbitMQ khi server đóng
process.on("SIGINT", async () => {
    console.log("Đang đóng kết nối đến RabbitMQ...");
    if (channel) await channel.close();
    if (connection) await connection.close();
    process.exit(0);
});

// Khởi động server và kết nối RabbitMQ
startRabbitMQ().catch((error) => console.error("Lỗi khi khởi động RabbitMQ:", error));
