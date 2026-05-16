import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Валидация
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Пожалуйста, заполните все поля" },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Токен Telegram бота или Chat ID не найдены!");
      return NextResponse.json(
        { error: "Ошибка настроек сервера" },
        { status: 500 }
      );
    }

    // Красивый формат сообщения для Telegram
    const telegramText = 
      `🔔 *Новое сообщение из формы связи!*\n\n` +
      `👤 *Имя:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `💬 *Сообщение:* ${message}`;

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramText,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("Ошибка Telegram API:", errData);
      return NextResponse.json(
        { error: "Произошла ошибка при отправке сообщения" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}