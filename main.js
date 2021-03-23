import {TelegramBot, UpdateType} from "https://deno.land/x/telegram_bot_api/mod.ts";

var bot = new TelegramBot(Deno.env.get('TOKEN'));

bot.on(UpdateType.Message, async ({ message: m }) => {
    try{
        var s = "";
        if(m.new_chat_participant || m.new_chat_member){
            console.log("hello");
            s = `
Brook is a free and open source software based on the GPLv3 license
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
Brook is a free and open source software based on the GPLv3 license
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
            if(m.text.indexOf('readme') != -1){
                s = `
English:
https://txthinking.github.io/brook/#/?id=cli-and-gui

中文
https://txthinking.github.io/brook/#/zh-cn/README
`;
            }
            if(m.text.indexOf('Background') != -1 || m.text.indexOf('Daemon') != -1 || m.text.indexOf('Boot') != -1){
                s = `
joker can run brook as deamon. boa can add auto start command at boot:
https://txthinking.github.io/brook/#/install-cli?id=install-via-nbsp-nami-%f0%9f%94%a5

joker demo:
https://txthinking.github.io/brook/#/brook-server?id=run-as-daemon-via-joker-%f0%9f%94%a5

boa demo:
https://txthinking.github.io/brook/#/brook-server?id=auto-start-at-boot-via-boa
`;
            }
            if(m.text.indexOf('后台运行') != -1 || m.text.indexOf('後台運行') != -1 || m.text.indexOf('守护进程') != -1 || m.text.indexOf('守護進程') != -1 || m.text.indexOf('開機啟動') != -1 || m.text.indexOf('开机启动') != -1){
                s = `
joker 可以让brook以守护进程运行, boa 可以添加开机启动命令:
https://txthinking.github.io/brook/#/zh-cn/install-cli?id=%e4%bd%bf%e7%94%a8nami%e5%ae%89%e8%a3%85brook%f0%9f%94%a5

joker 例子:
https://txthinking.github.io/brook/#/zh-cn/brook-server?id=%e4%bd%bf%e7%94%a8joker%e8%bf%90%e8%a1%8c%e5%ae%88%e6%8a%a4%e8%bf%9b%e7%a8%8b%f0%9f%94%a5

boa 例子:
https://txthinking.github.io/brook/#/zh-cn/brook-server?id=%e4%bd%bf%e7%94%a8boa%e5%bc%80%e6%9c%ba%e8%87%aa%e5%8a%a8%e5%90%af%e5%8a%a8%e5%91%bd%e4%bb%a4
`;
            }
            if(m.text.indexOf('Hey') != -1){
                s = "Hey :)";
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
