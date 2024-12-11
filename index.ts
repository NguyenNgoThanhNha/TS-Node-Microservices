const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run() {
    const chatSession = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    { text: "Xin chào" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "Chào bạn!\n" },
                ],
            },
            {
                role: "user",
                parts: [
                    { text: "Solace là ứng dụng SPA có tích hợp AI có thể giúp cho người dùng nhận biết được tình trạng da của họ và giới thiệu cho họ lộ trình cũng như sản phẩm phù hợp với da của họ." },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "Đó là một ý tưởng ứng dụng tuyệt vời!  Solace, một ứng dụng SPA tích hợp AI để phân tích tình trạng da và đề xuất lộ trình/sản phẩm phù hợp, có tiềm năng lớn.  Tuy nhiên, để thành công, cần xem xét một số điểm quan trọng:\n\n* **Độ chính xác của AI:**  Độ chính xác của việc phân tích ảnh da là cực kỳ quan trọng.  Sai sót trong việc chẩn đoán có thể dẫn đến việc đề xuất sản phẩm không phù hợp, thậm chí gây hại cho người dùng.  Cần đầu tư mạnh vào việc huấn luyện AI với một tập dữ liệu khổng lồ và đa dạng, bao gồm nhiều loại da, sắc tố và điều kiện da khác nhau.  Cân nhắc việc hợp tác với các chuyên gia da liễu để đảm bảo độ chính xác.\n\n* **Bảo mật dữ liệu:**  Ứng dụng sẽ thu thập dữ liệu hình ảnh cá nhân rất nhạy cảm.  Việc bảo mật và tuân thủ các quy định về bảo vệ dữ liệu (như GDPR) là bắt buộc.  Cần minh bạch với người dùng về cách dữ liệu được sử dụng và lưu trữ.\n\n* **Tương tác người dùng:**  Giao diện người dùng cần trực quan, dễ sử dụng và thân thiện.  Quá trình phân tích và đề xuất sản phẩm cần nhanh chóng và dễ hiểu.  Cung cấp các hướng dẫn rõ ràng và chi tiết.\n\n* **Khả năng tích hợp:**  Khả năng tích hợp với các nền tảng thương mại điện tử để người dùng có thể mua sản phẩm được đề xuất một cách dễ dàng sẽ rất hữu ích.\n\n* **Khả năng mở rộng:**  Ứng dụng cần được thiết kế để có thể mở rộng và xử lý một lượng lớn người dùng.\n\n* **Quản lý rủi ro:**  Cần có cơ chế quản lý rủi ro và xử lý khiếu nại của người dùng.  Tuyên bố từ chối trách nhiệm rõ ràng là cần thiết, vì ứng dụng chỉ cung cấp đề xuất và không thể thay thế lời khuyên của chuyên gia y tế.\n\nTóm lại, Solace có tiềm năng lớn, nhưng thành công phụ thuộc vào việc giải quyết các thách thức kỹ thuật, bảo mật và kinh doanh được đề cập ở trên.  Việc tập trung vào độ chính xác, bảo mật, và trải nghiệm người dùng tốt sẽ là chìa khóa để tạo ra một ứng dụng thành công.\n" },
                ],
            },
            {
                role: "user",
                parts: [
                    { text: "Solace là gì" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "Solace, trong ngữ cảnh bạn đã mô tả trước đó, là tên của một ứng dụng di động (mobile app) giả định.  Ứng dụng này sử dụng trí tuệ nhân tạo (AI) để phân tích hình ảnh da của người dùng và đưa ra lời khuyên về các sản phẩm và liệu trình chăm sóc da phù hợp.  Nó giống như một chuyên gia tư vấn chăm sóc da cá nhân trong lòng bàn tay bạn.  Tuy nhiên, cần nhớ rằng đây chỉ là một ý tưởng ứng dụng, chưa tồn tại ở ngoài đời thực.\n" },
                ],
            },
        ],
    });

    const result = await chatSession.sendMessage("Solace là gì? mô tả chi tiết ứng dụng");
    console.log(result.response.text());
}

run();