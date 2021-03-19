import {TelegramBot, UpdateType} from "https://deno.land/x/telegram_bot_api/mod.ts";

var bot = new TelegramBot(Deno.env.get('TOKEN'));

bot.on(UpdateType.Message, async ({ message: m }) => {
    try{
        console.log(m);
        var s = "";
        if(m.new_chat_participant || m.new_chat_member){
            console.log("hello");
            s = `
Brook is a free and open source software based on the GPLv3 agreement
Brook是一個基於GPLv3協議的免費開源軟件.

Github:
https://github.com/txthinking/brook

Document(官方文檔):
https://txthinking.github.io/brook/

保持 友好 禮貌 風度 互相幫助
`;
        }
        if(s == '' && !m.text){
            return;
        }
        if(s == '' && m.text.indexOf('brook_community_bot') != -1){
            if(m.text.indexOf('Welcome') != -1 || m.text.indexOf('歡迎') != -1 || m.text.indexOf('欢迎') != -1){
                s = `
Brook is a free and open source software based on the GPLv3 agreement
Brook是一個基於GPLv3協議的免費開源軟件.

Github:
https://github.com/txthinking/brook

Document(官方文檔):
https://txthinking.github.io/brook/

保持 友好 禮貌 風度 互相幫助
`;
            }
            if(m.text.indexOf('Document') != -1 || m.text.indexOf('文档') != -1 || m.text.indexOf('文檔') != -1){
                s = "https://txthinking.github.io/brook/";
            }
            if(m.text.indexOf('Blog') != -1 || m.text.indexOf('博客') != -1 || m.text.indexOf('命令行三部曲') != -1){
                s = "https://talks.txthinking.com/";
            }
            if(m.text.indexOf('Script') != -1 || m.text.indexOf('腳本') != -1 || m.text.indexOf('脚本') != -1){
                s = "https://brook-community.github.io/script/";
            }
            if(m.text.indexOf('Youtube') != -1 || m.text.indexOf('視頻') != -1 || m.text.indexOf('视频') != -1){
                s = "https://brook-community.github.io/script/";
            }
            if(m.text.indexOf('Community') != -1 || m.text.indexOf('論壇') != -1 || m.text.indexOf('论坛') != -1){
                s = "https://github.com/txthinking/brook/discussions";
            }
            if(m.text.indexOf('Who are you') != -1){
                s = "I am here: https://github.com/brook-community/wall-e You can help me become better";
            }
            if(m.text.indexOf('你是誰') != -1 || m.text.indexOf('你是谁') != -1){
                s = "我在這裡: https://github.com/brook-community/wall-e 你可以幫助我變得更好";
            }
        }
    }catch(e){
        s = e.message + '. Please help me. 請幫助我: https://github.com/brook-community/wall-e';
    }
    if(s == ''){
        return;
    }
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
