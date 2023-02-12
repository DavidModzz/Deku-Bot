const fs = require('fs')
const chalk = require('chalk')
const moment = require("moment-timezone")

// SETTING //

global.prefix = "*" //prefijo
global.botName =  "𝑫𝒆𝒌𝒖 𝑩𝒐𝒕" // nombre del bot 
global.owner = "David" // No cambiar
global.ownerNumber = "595994966449"

// Setting

global.packname = '© Powered By'
global.author = '𝑫𝒆𝒌𝒖 𝑩𝒐𝒕'
global.mess = {
            norg: `*No estas registrado, usa ${prefix}rg para registrarte*`,
            espere: " ..enviando.. ",
            wait: "𝑬𝒏𝒗𝒊𝒂𝒏𝒅𝒐...",
            owner: "𝑬𝒔𝒕𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒆𝒔 𝒆𝒙𝒄𝒍𝒖𝒔𝒊𝒗𝒐 𝒑𝒂𝒓𝒂 𝒎𝒊 𝒄𝒓𝒆𝒂𝒅𝒐𝒓",
            groups: "𝑬𝒔𝒕𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒆𝒔 𝒔𝒐𝒍𝒐 𝒑𝒂𝒓𝒂 𝒈𝒓𝒖𝒑𝒐𝒔",
            private: "𝑬𝒔𝒕𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒆𝒔 𝒔𝒐𝒍𝒐 𝒑𝒂𝒓𝒂 𝒄𝒉𝒂𝒕𝒔",
            admin: "𝑬𝒔𝒕𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒆𝒔 𝒔𝒐𝒍𝒐 𝒑𝒂𝒓𝒂 𝒂𝒅𝒎𝒊𝒏𝒔",
            botadmin: "𝑬𝒔𝒕𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒆𝒔 𝒔𝒐𝒍𝒐 𝒇𝒖𝒏𝒄𝒊𝒐𝒏𝒂 𝒔𝒊 𝒆𝒍 𝒃𝒐𝒕 𝒆𝒔 𝒂𝒅𝒎𝒊𝒏",
            error: "𝑬𝒓𝒓𝒐𝒓, 𝑰𝒏𝒕𝒆𝒏𝒕𝒆 𝒏𝒖𝒆𝒗𝒂𝒎𝒆𝒏𝒕𝒆 "
         },
            

global.sgc = 'https://pornhub.com'

//⫹⫺ ╳╶╼╶╶╶╶┈ ⎝ OTHER ⎞ ┈╴╴╴╴╾╴╳ ⫹⫺
global.dpptx = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
global.ddocx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.dxlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
global.dpdf = 'application/pdf'
global.drtf = 'text/rtf'

global.thumb = fs.readFileSync('./media/img/1.jpg')
global.pic = { url: 'https://telegra.ph/file/edb7387b1fc7a36bb60e6.jpg' }
global.nopp = { url: 'https://tinyurl.com/yx93l6da'}
global.pic2 = { url: 'https://telegra.ph/file/357dbb2cfe0bc7d7c45d1.jpg' }
global.wibu = [
       "https://www.thiswaifudoesnotexist.net/example-6970.jpg",
        "https://www.thiswaifudoesnotexist.net/example-6271.jpg",
        "https://www.thiswaifudoesnotexist.net/example-6514.jpg",
        "https://www.thiswaifudoesnotexist.net/example-3313.jpg",
        "https://www.thiswaifudoesnotexist.net/example-2870.jpg",
        "https://www.thiswaifudoesnotexist.net/example-5613.jpg",
        "http://www.thiswaifudoesnotexist.net/example-1576.jpg"
]
global.tiktokdl = "https://telegra.ph/file/d59093b0f0ce4a4635991.jpg"

global.fsizedoc = '99999999999999'
global.fpagedoc = '999'   


global.welcome = JSON.parse(fs.readFileSync("./database/group/welcome.json"))


global.hour = moment().tz('America/asuncion').format('HH:mm:ss')
      
        // VERIFICACIONES 

global.vlive =  {
            key: {
               participant: '0@s.whatsapp.net'
            },
            message: {
               liveLocationMessage: {}
            }
         }

global.vimg =  {
            key: {
               participant: '0@s.whatsapp.net'
            },
            message: {
               imageMessage: {}
            }
         }
         
global.vvid = {
            key: {
               participant: '0@s.whatsapp.net'
            },
            message: {
               videoMessage: {}
            }
         }
         
global.vdoc = {
            key: {
               participant: '0@s.whatsapp.net'
            },
            message: {
               documentMessage: {}
            }
         }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.greenBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
