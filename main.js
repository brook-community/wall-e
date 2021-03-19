import {TelegramBot, UpdateType} from "https://deno.land/x/telegram_bot_api/mod.ts";

var bot = new TelegramBot(Deno.env.get('TOKEN'));

bot.on(UpdateType.Message, async ({ message: m }) => {
    var s = "hello";
    await bot.sendMessage({
        chat_id: m.chat.id,
        parse_mode: 'MarkdownV2',
        text: "```\n"+s+"\n```",
    });
});

bot.run({
    webhook: {
        port: parseInt(Deno.env.get('PORT') ?? '8000'),
        pathname: `/message`,
    },
});
