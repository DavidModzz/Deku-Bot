const fs = require('fs')
const chalk = require('chalk')
const moment = require("moment-timezone")

// SETTING //

global.prefix = "*" //prefijo
global.botName =  "π«πππ π©ππ" // nombre del bot 
global.owner = "David" // No cambiar
global.ownerNumber = "595994966449"

// Setting

global.packname = 'Β© Powered By'
global.author = 'π«πππ π©ππ'
global.mess = {
            norg: `*No estas registrado, usa ${prefix}rg para registrarte*`,
            espere: " ..enviando.. ",
            wait: "π¬πππππππ...",
            owner: "π¬πππ πππππππ ππ πππππππππ ππππ ππ πππππππ",
            groups: "π¬πππ πππππππ ππ ππππ ππππ ππππππ",
            private: "π¬πππ πππππππ ππ ππππ ππππ πππππ",
            admin: "π¬πππ πππππππ ππ ππππ ππππ ππππππ",
            botadmin: "π¬πππ πππππππ ππ ππππ ππππππππ ππ ππ πππ ππ πππππ",
            error: "π¬ππππ, π°ππππππ ππππππππππ "
         },
            

global.sgc = 'https://pornhub.com'

//β«Ήβ«Ί β³βΆβΌβΆβΆβΆβΆβ β OTHER β ββ΄β΄β΄β΄βΎβ΄β³ β«Ήβ«Ί
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
