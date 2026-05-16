export async function sendTelegramResult(data: {
  studentName: string; testTitle: string; subject: string;
  score: number; totalPoints: number; percentage: number; timeSpent: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  const now = new Date().toLocaleString("ru-RU");
  const text = `📝 Новый результат теста!\n👤 Имя: ${data.studentName}\n📚 Тест: ${data.testTitle}\n🎯 Предмет: ${data.subject}\n✅ Результат: ${data.score}/${data.totalPoints} баллов (${data.percentage}%)\n⏱ Время: ${data.timeSpent}\n🕐 Дата: ${now}`;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}
