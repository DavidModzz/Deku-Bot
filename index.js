// BASE PARA CREADORES DE BOTS 

// CREDITOS : CLOVERS MODS
// CREDITOS : JULS MODDERS

// CONSTANTES DE NODULES 

require('./deku.js')

const {
   default: WAConnection,
   downloadContentFromMessage,
   emitGroupParticipantsUpdate,
   emitGroupUpdate,
   generateWAMessageContent,
   generateWAMessage,
   makeInMemoryStore,
   prepareWAMessageMedia,
   MediaType,
   areJidsSameUser,
   WAMessageStatus,
   AuthenticationState,
   GroupMetadata,
   initInMemoryKeyStore,
   getContentType,
   MiscMessageGenerationOptions,
   useSingleFileAuthState,
   BufferJSON,
   WAMessageProto,
   MessageOptions,
   WAFlag,
   WANode,
   WAMetric,
   ChatModification,
   MessageTypeProto,
   WALocationMessage,
   ReconnectMode,
   WAContextInfo,
   proto,
   WAGroupMetadata,
   ProxyAgent,
   waChatKey,
   MimetypeMap,
   MediaPathMap,
   WAContactMessage,
   WAContactsArrayMessage,
   WAGroupInviteMessage,
   WATextMessage,
   WAMessageContent,
   WAMessage,
   BaileysError,
   WA_MESSAGE_STATUS_TYPE,
   MediaConnInfo,
   URL_REGEX,
   WAUrlInfo,
   WA_DEFAULT_EPHEMERAL,
   WAMediaUpload,
   mentionedJid,
   processTime,
   Browser,
   MessageType,
   Presence,
   WA_MESSAGE_STUB_TYPES,
   Mimetype,
   relayWAMessage,
   Browsers,
   GroupSettingChange,
   delay,
   DisconnectReason,
   WASocket,
   getStream,
   WAProto,
   isBaileys,
   AnyMessageContent,
   fetchLatestBaileysVersion
} = require('@adiwajshing/baileys');

const fs = require('fs');
const P = require('pino');
const yts = require("yt-search");
const cfonts = require("cfonts");
const chalk = require('chalk')
const axios = require('axios');
const speed = require("performance-now");
const mimetype = require('mime-types');
const ffmpeg = require("fluent-ffmpeg");
const timeZone = require('moment-timezone');
const os = require('os')
const FileType = require('file-type')

const { exec, spawn } = require("child_process")

const {
   color,
   orange,
   green,
   red
} = require("./lib/color")

const roleta = JSON.parse(fs.readFileSync('./database/group/cassino.json'));

const porcentagem = JSON.parse(fs.readFileSync('./database/group/porcentagem.json')); 

const {
   banner,
   getBuffer,
   getRandom,
   getExtension,
   banner2,
   time,
   runtime,
   formatp,
   sleep
} = require('./lib/functions.js');

const {
   fetchJson
} = require("./lib/fetcher")

// CONEXION DEL BOT

const store = makeInMemoryStore({
   logger: P().child({
      level: 'debug',
      stream: 'linhaDoTempo'
   })
})

const {
   state,
   saveState
} = useSingleFileAuthState('./database/bot/deku.json')

async function startDeku() {
   const {
      version,
      isLatest
   } = await fetchLatestBaileysVersion()
   
   console.log(green(`Conectando...`))
   console.log(banner.string)
   console.log(banner2.string)
   console.log(green("Conectado Exitosamente"))
   
   const anita = WAConnection({
      logger: P({
         level: "silent"
      }),
      printQRInTerminal: true,
      browser: ['𝑫𝒆𝒌𝒖 𝑩𝒐𝒕', 'safari', '15.2'],
      auth: state
   })
   
   anita.ev.on("creds.update", saveState)
   store.bind(anita.ev)
   anita.ev.on("chats.set", () => {
      console.log("Tem conversas", store.chats.all())
   })
   anita.ev.on("contacts.set", () => {
      console.log("Tem contatos", Object.values(store.contacts))
   })
   anita.ev.on("connection.update", (update) => {
      const {
         connection,
         lastDisconnect
      } = update
      if (connection === "close") {
         const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
         console.log(orange('Coneccion inestable'), lastDisconnect.error, orange("Intentando conectar..."), shouldReconnect);
         if (shouldReconnect) {
            startDeku()
         }
      } else if (connection === "open") {
         console.log(green("Bot conectado correctamente!!!"))
      }
   })
   //*******************************************//
   
   const reSize = async(buffer, ukur1, ukur2) => {
             return new Promise(async(resolve, reject) => {
             let jimp = require('jimp')
             var baper = await jimp.read(buffer);
             var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
             resolve(ab)
             })
             }
   
   anita.ev.on('messages.upsert', async (m) => {
      function getGroupAdmins(participants) {
         admins = []
         for (let i of participants) {
            if (i.admin == 'admin') admins.push(i.id)
            if (i.admin == 'superadmin') admins.push(i.id)
         }
         return admins
      }
      try {
         const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`
         }
         const getExtension = async (type) => {
            return await mimetype.extension(type)
         }
         const getBuffer = (url, options) => new Promise(async (resolve, reject) => {
            options ? options : {}
            await axios({
               method: "get",
               url,
               headers: {
                  "DNT": 1,
                  "Upgrade-Insecure-Request": 1
               },
               ...options,
               responseType: "arraybuffer"
            }).then((res) => {
               resolve(res.data)
            }).catch(reject)
         })
         //***************[ FUNCIONES ]***************//
         const info = m.messages[0]
         if (!info.message) return
         if (info.key && info.key.remoteJid == 'status@broadcast') return
         const type = Object.keys(info.message)[0] == 'senderKeyDistributionMessage' ? Object.keys(info.message)[2] : (Object.keys(info.message)[0] == 'messageContextInfo') ? Object.keys(info.message)[1] : Object.keys(info.message)[0]
         const content = JSON.stringify(info.message);
         const altpdf = Object.keys(info.message)
         global.prefix
         const from = info.key.remoteJid
         var body = (type === 'conversation') ? info.message.conversation : (type == 'imageMessage') ? info.message.imageMessage.caption : (type == 'videoMessage') ? info.message.videoMessage.caption : (type == 'extendedTextMessage') ? info.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? info.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? info.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? info.message.templateButtonReplyMessage.selectedId : ''
         const budy = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''
         var pes = (type === 'conversation' && info.message.conversation) ? info.message.conversation : (type == 'imageMessage') && info.message.imageMessage.caption ? info.message.imageMessage.caption : (type == 'videoMessage') && info.message.videoMessage.caption ? info.message.videoMessage.caption : (type == 'extendedTextMessage') && info.message.extendedTextMessage.text ? info.message.extendedTextMessage.text : ''
         const isGroup = info.key.remoteJid.endsWith('@g.us')
         const sender = isGroup ? info.key.participant : info.key.remoteJid
         const groupMetadata2 = isGroup ? await anita.groupMetadata(from)  :  " "
const participantss = isGroup ? await groupMetadata2.participants : ' '

         const groupMetadata = isGroup ? await anita.groupMetadata(from) : ''
     
         const groupName = isGroup ? groupMetadata.subject : ''
         const groupDesc = isGroup ? groupMetadata.desc : ''
         const groupMembers = isGroup ? await groupMetadata.participants : ''
         const participants = isGroup ? await groupMetadata.participants : [];
         const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
         const pushname = info.pushName ? info.pushName : ''
         const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
         const botNumber = anita.user.id.split(':')[0] + '@s.whatsapp.net'
         const isOwner = ownerNumber.includes || ownerNumber.includes(sender)
         const args = body.trim().split(/ +/).slice(1);
         const isCmd = body.startsWith(prefix);
         const command = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null

         const enviar = (text) => {
            anita.sendMessage(from, {
               text: text
            }, {
               quoted: info
            })
         }
         
         const mentions = (teks, memberr, id) => {
            (id == null || id == undefined || id == false) ? anita.sendMessage(from, {
               text: teks.trim(),
               mentions: memberr
            }): anita.sendMessage(from, {
               text: teks.trim(),
               mentions: memberr
            })
         }

         //isQuoted 
         const isImage = type == 'imageMessage'
         const isVideo = type == 'videoMessage'
         const isAudio = type == 'audioMessage'
         const isSticker = type == 'stickerMessage'
         const isContact = type == 'contactMessage'
         const isLocation = type == 'locationMessage'
         const isProduct = type == 'productMessage'
         const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage')
         typeMessage = body.substr(0, 50).replace(/\n/g, '')
         if (isImage) typeMessage = "Image"
         else if (isVideo) typeMessage = "Video"
         else if (isAudio) typeMessage = "Audio"
         else if (isSticker) typeMessage = "Sticker"
         else if (isContact) typeMessage = "Contact"
         else if (isLocation) typeMessage = "Location"
         else if (isProduct) typeMessage = "Product"
         const isQuotedMsg = type === 'extendedTextMessage' && content.includes('textMessage')
         const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
         const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
         const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
         const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
         const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
         const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
         const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
         const isQuotedProduct = type === 'extendedTextMessage' && content.includes('productMessage')
         
         const getFileBuffer = async (mediakey, MediaType) => {
            const stream = await downloadContentFromMessage(mediakey, MediaType)
            let buffer = Buffer.from([])
            for await (const chunk of stream) {
               buffer = Buffer.concat([buffer, chunk])
            }
            return buffer
         }
         
         const isGroupAdmins = groupAdmins.includes(sender) || false
         const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
         //*******************************************//
         q = args.join(" ")
    
    if (isCmd) {
		data = await fetchJson('https://api.countapi.xyz/hit/Deku-Bot/visitor')
		totalcmd = `${data.value}`
		dataa = await fetchJson(`https://api.countapi.xyz/hit/deku${timeZone.tz('america/Asuncion').format('DDMMYYYY')}/visits`)
		hittoday = `${dataa.value}`
	}
         
         const sendBtext = async (id, text1, desc1, but = [], vr) => {
            buttonMessage = {
               text: text1,
               footer: desc1,
               buttons: but,
               headerType: 1
            }
            anita.sendMessage(id, buttonMessage, {
               quoted: vr
            })
         }
         
         const sendBimg = async (id, img1, text1, desc1, but = [], vr) => {
            buttonMessage = {
               image: {
                  url: img1
               },
               caption: text1,
               footerText: desc1,
               buttons: but,
               headerType: 4
            }
            anita.sendMessage(id, buttonMessage, {
               quoted: vr
            })
         }
         
         const sendBimgT = async (id, img1, text1, desc1, but = [], vr) => {
            templateMessage = {
               image: {
                  url: img1
               },
               caption: text1,
               footer: desc1,
               templateButtons: but,
            }
            anita.sendMessage(id, templateMessage, {
               quoted: vr
            })
         }
         
         const sendGifButton = async (id, gif1, text1, desc1, but = [], vr) => {
            buttonMessage = {
               video: {
                  url: gif1
               },
               caption: text1,
               gifPlayback: true,
               footerText: desc1,
               buttons: but,
               headerType: 4
            }
            anita.sendMessage(id, buttonMessage, {
               quoted: vr
            })
         }
         //*******************************************//


         if (budy == `${prefix}`) {
            enviar('🤔jdndndn👍')
         }
         
         downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
     let quoted = message?.msg ? message?.msg: message
     let mime = (message.msg || message).mimetype || ''
     let messageType = message.mtype ? message.mtype.replace(/Message/gi, ''): mime.split('/')[0]
     const stream = await downloadContentFromMessage(quoted, messageType)
     let buffer = Buffer.from([])
     for await(const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk])
     }
     let type = await FileType.fromBuffer(buffer)
     trueFileName = attachExtension ? (filename + '.' + type.ext): filename
     // save to file
     await fs.writeFileSync(trueFileName, buffer)
     return trueFileName
    }

         //=====\\

         // MENSAJES EN CONSOLA

         if (!isGroup && isCmd) console.log(`${green('╭━━━━━━━━━━━━━━━━━━━━━━━━━╮')}\n${green('┃')} ${green('Número:')} ${color(sender.split('@')[0], 'white')}\n${green('┃')} ${green('Nombre:')} ${color(pushname, 'white')}\n${green('┃')} ${green('command:')} ${color(command, 'white')}\n${green('┃')} ${green('Palabras:')} ${color(budy.length, 'white')}\n${green('╰━━━━━━━━━━━━━━━━━━━━━━━━━╯')}`)
         if (!isGroup && !isCmd) console.log(`${green('╭━━━━━━━━━━━━━━━━━━━━━━━━━╮')}\n${green('┃')} ${green('Número:')} ${color(sender.split('@')[0], 'white')}\n${green('┃')} ${green('Nombre:')} ${color(pushname, 'white')}\n${green('┃')} ${green('command:')} ${color('No', 'white')}\n${green('┃')} ${green('Palabras:')} ${color(budy.length, 'white')}\n${green('╰━━━━━━━━━━━━━━━━━━━━━━━━━╯')}`)
         if (isGroup && isGroup) console.log(`${green('╭━━━━━━━━━━━━━━━━━━━━━━━━━╮')}\n${green('┃')} ${green('Número:')} ${color(sender.split('@')[0], 'white')}\n${green('┃')} ${green('Nombre:')} ${color(pushname, 'white')}\n${green('┃')} ${green('command:')} ${color(command, 'white')}\n${green('┃')} ${green('Palabras:')} ${color(budy.length, 'white')}\n${green('┃')} ${green('Grupo:')} ${color(groupName, 'white')}\n${green('╰━━━━━━━━━━━━━━━━━━━━━━━━━╯')}`)
         if (!isGroup && isGroup) console.log(`${green('╭━━━━━━━━━━━━━━━━━━━━━━━━━╮')}\n${green('┃')} ${green('Número:')} ${color(sender.split('@')[0], 'white')}\n${green('┃')} ${green('Nombre:')} ${color(pushname, 'white')}\n${green('┃')} ${green('Horário:')} ${color(time, 'white')}\n${green('┃')} ${green('command:')} ${color('No', 'white')}\n${green('┃')} ${green('Palabras:')} ${color(budy.length, 'white')}\n${green('┃')} ${green('Grupo:')} ${color(groupName, 'white')}\n${green('╰━━━━━━━━━━━━━━━━━━━━━━━━━╯')}`)


         // CASES 

         switch (command) {
         
         
         case 'menu': case 'test': {
        let buttons = [
                    {buttonId: `rules`, buttonText: {displayText: 'opcion 1'}, type: 1},
                    {buttonId: `donasi`, buttonText: {displayText: 'opcion 2'}, type: 1},
                    {buttonId: `owner`, buttonText: {displayText: 'opcion 3'}, type: 1}
                ]
                let buttonMessage = {
                    image: pic,
                    caption: `aca\n\n\n\nva\n\n\n\nel\n\n\n\nmenu`,
                    footer: `${global.botName}`,
                    buttons: buttons,
                    headerType: 4,
               contextInfo: {
               forwardingScore: fsizedoc,
               externalAdReply: { body: 'Tes',
               containsAutoReply: true,
               mediaType: 1,
               mediaUrl: pic,
               renderLargerThumbnail: true,
               showAdAttribution: true,
               sourceId: 'Hola man',
               sourceType: 'PDF',
               previewType: 'PDF',
               sourceUrl: 'https://chat.whatsapp.com/IrH11gjSJO93yTTV4zt4fN',
               thumbnail: fs.readFileSync(`./media/img/1.jpg`),
               thumbnailUrl: 'https://chat.whatsapp.com/IrH11gjSJO93yTTV4zt4fN',
               title: 'Menu placeholder'}}}
                anita.sendMessage(from, buttonMessage, { quoted: info })
        }       
        break

        case 'menu2': {
let buttons = [
                    {buttonId: `rules`, buttonText: {displayText: 'opcion 1'}, type: 1},
                    {buttonId: `donasi`, buttonText: {displayText: 'opcion 2'}, type: 1},
                    {buttonId: `owner`, buttonText: {displayText: 'opcion 3'}, type: 1}
                ]
        const buttonMessage = {
        document: { url: "https://wa.me/595994966449" },
        mimetype: drtf,
        fileName: `${time} ${pushname}`,
        fileLength: 88808964843634667969,
        caption: `hola @${sender.split("@")[0]} 👋\ncomandos totales usados: ${totalcmd}\nComandos usados hoy: ${hittoday}\nTiempo activo: ${runtime(process.uptime())}\nPrefix [ ${prefix} ] \nAcá los comandos`,
        mentions: [sender],
        footer: botName,
        buttons: buttons,
        headerType: 4,
        contextInfo: {
               forwardingScore: fsizedoc,
               externalAdReply: { 
               containsAutoReply: true,
               mediaType: 1,
               mediaUrl: pic,
               renderLargerThumbnail: true,
               showAdAttribution: true,
               sourceId: 'tes',
               sourceType: 'PDF',
               previewType: 'PDF',
               sourceUrl: sgc,
               thumbnail: thumb,
               thumbnailUrl: sgc}}}
anita.sendMessage(from, buttonMessage, { quoted: info })
        }
        break

         //fun menu
case 'cuantomemide':
case 'tama�opija':
if (!isGroup) return enviar('Este comando solo puede ser usado en grupos')
random = `${Math.floor(Math.random() * 25)}`
hasil = `okey\n\nEl pene te mide *${random}* cm`
await anita.sendMessage(from, {text: hasil}, {quoted: info})
break

case 'dado':
const dadus = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"]
dadu = dadus[Math.floor(Math.random() * dadus.length)]
dador = fs.readFileSync('./media/webp/' + dadu + '.webp')
anita.sendMessage(from, {sticker: dador}, {quoted: info})
break

case 'casino': case 'ruleta':
const cassino = roleta.cassino.roleta[Math.floor(Math.random() * roleta.cassino.roleta.length)]
const vitoriass = roleta.vitoria.ganhou[Math.floor(Math.random() * roleta.vitoria.ganhou.length)]
const percass = roleta.vitoria.perdeu[Math.floor(Math.random() * roleta.vitoria.perdeu.length)]
if ((cassino == '⟮ ♥ ⟯⟮ ♥ ⟯⟮ ♥ ⟯') ||(cassino == '⟮ ♦ ⟯⟮ ♦ ⟯⟮ ♦ ⟯') ||(cassino == '⟮ ♣ ⟯⟮ ♣ ⟯⟮ ♣ ⟯') ||(cassino == '⟮ ♠ ⟯⟮ ♠ ⟯⟮ ♠ ⟯')) {
var Vitória = `${vitoriass}`
} else {
var Vitória = `${percass}`
}
const cassino2 = `
╭━━━━❪  🎰  ❫━━━━
┃     💰  𝘾𝘼𝙎𝙄𝙉𝙊 💰
┣━━━━━━━━━━━
┃=➤ *${cassino}*
┣━━━━━━━━━━━
┃ *${Vitória}*
┗━━━━❪  💰  ❫━━━━`
anita.sendMessage(from, {text: cassino2}, {quoted: info})
break
                
                // Downloader
        case 'play': case 'ytplay': {
                if (!q) throw `Ejemplo : ${prefix + command} coding`
                let yts = require("yt-search")
                let search = await yts(q)
                let anu = search.videos[Math.floor(Math.random() * search.videos.length)]
                let buttons = [
                    {buttonId: `${prefix}ytmp3 ${anu.url}`, buttonText: {displayText: '♫ Audio'}, type: 1},
                    {buttonId: `${prefix}ytmp4 ${anu.url}`, buttonText: {displayText: '► Video'}, type: 1}
                ]
                let buttonMessage = {
                    image: { url: anu.thumbnail },
                    caption: `
Titulo : ${anu.title}
Ext : Busqueda
ID : ${anu.videoId}
Duración : ${anu.timestamp}
Visitas : ${anu.views}
Publicado: ${anu.ago}
Autor : ${anu.author.name}
Canal : ${anu.author.url}
Descripción : ${anu.description}
Url : ${anu.url}`,
                    footer: `${botName}`,
                    buttons: buttons,
                    headerType: 4
                }
                anita.sendMessage(from, buttonMessage, { quoted: info })
            }
            break
            
             case 'playmp3': case 'ytplaymp3': case 'ytplayaudio': {
        	 
         	if (!q) throw `Ejemplo : ${prefix + command} titulo`
         	enviar('Espere porfavor')
             let ytplaymp3 = await fetchJson(`https://danzzapi.xyz/api/downloader/ytplaymp3?query=${q}&apikey=danzzprem`)
             anita.sendMessage(from, { audio: { url: ytplaymp3.result.url }, mimetype: 'audio/mpeg', fileName: `${q}.mp3` }, { quoted: info })
         	}
         break
            
             case 'playmp4': case 'ytplaymp4': case 'ytplayvideo': {
         	
         	if (!q) throw `Ejemplo : ${prefix + command} titulo`
         	enviar('Espere porfavor')
             let ytplaymp4 = await fetchJson(`https://danzzapi.xyz/api/downloader/ytplaymp4?query=${q}&apikey=danzzprem`)
             anita.sendMessage(fron, { video: { url: ytplaymp4.result.url }, mimetype: 'video/mp4', fileName: `${q}.mp4`, caption: `Listo` }, { quoted: info })
         	}
         break
         
         case 'youtubemp3': case 'ytaudio': case 'ytmp3': case 'yta': {
         	if (!q) throw `Ejemplo : ${prefix + command} url`
         	enviar('Espere porfavor')
             let ytmp3 = await fetchJson(`https://danzzapi.xyz/api/downloader/ytmp4?url=${q}&apikey=danzz`)
             anita.sendMessage(from, { audio: { url: ytmp3.result.url }, mimetype: 'audio/mpeg', caption: `Listo` }, { quoted: info })
         	}
         break
         
         case 'youtubemp4': case 'ytvideo': case 'ytmp4': case 'ytv': {
         	if (!q) throw `Ejemplo : ${prefix + command} url`
         	enviar('Espere porfavor')
             let ytmp4 = await fetchJson(`https://danzzapi.xyz/api/downloader/ytmp4?url=${q}&apikey=danzz`)
             anita.sendMessage(from, { video: { url: ytmp4.result.url }, mimetype: 'video/mp4', caption: `Titulo: ${ytmp4.result.title}` }, { quoted: info })
         	}
         break
         
         //tools 
         case 'ebinary': {
            
            if (!q) return enviar(`Ejempll : ${prefix + command} texto`)
            let { eBinary } = require('./lib/binary')
            let eb = await eBinary(q)
            enviar(eb)
        }
        break
            case 'dbinary': {
            
            if (!q) return enviar(`Ejemplo : ${prefix + command} texto`)
            let { dBinary } = require('./lib/binary')
            let db = await dBinary(q)
            enviar(db)
        }
        break

case 'qrcode':
const tex = encodeURIComponent(body.slice(8))
if (!tex) return enviar('Y el texto para convertir a codugo qr?')
const bufferr = await getBuffer(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${tex}`)
anita.sendMessage(from, {image: bufferr}, {quoted: info})
break

case'tiktokstalk': case'tikstalk': case'ttstalk':
if(!q) return enviar('*Y el Usuario?*')
tikstalk.tiktokStalk(
`${q}`)
  .then(result => {
  const caption = `┌───< ✨𝐓𝐢𝐤𝐓𝐨𝐤 𝐒𝐭𝐚𝐥𝐤✨>
*┊Usuario:* ${result.name}
*┊Nombre:* ${result.username}
*┊seguidores :* ${result.followers}
*┊Seguidos :* ${result.following}
*┊Descripcion :* ${result.description}
└───< ✨𝐓𝐢𝐤𝐓𝐨𝐤 𝐒𝐭𝐚𝐥𝐤✨> `
    anita.sendMessage(from, {image: {url: result.pp_user}, caption: caption}, {quoted: info})
    //anita.sendMessage(from, {text: caption})
  })
  .catch(e => enviar(mess.error))
break
         
        case 'ping': case 'info': case 'botstatus': {
                let timestamp = speed()
                let latensi = speed() - timestamp
                neww = performance.now()
                oldd = performance.now()
                respon = `
*Tiempo de respuesta:* \n${latensi.toFixed(4)} _Segundos_ \n\n*Tiempo activo:* \n${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
`.trim()
                enviar(respon)
            }
            break

// owner
case 'broadcast': case 'bc': {
if (!isOwner) return enviar(mess.owner)
if (!q) return enviar('y el mensaje que deseas transmitir')
let getGroups = await anita.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
let data_teks = `${q}`
enviar(`Enviar transmisión a ${anu.length} Hora de finalización del chat grupal ${anu.length * 1.5} segundos`)
for (let i of anu) {
await sleep(1500)
let buttons = [
{ buttonId: `${prefix}owner`, buttonText: { displayText: 'Creador ' }, type: 1 }
            ]
let buttonMessage = {
                image: thumb,
                fileLength: 100,
                caption: `      *༺ᏴᎡϴᎪᎠᏟᎪՏͲ༻*`,
                footer: data_teks + `\n\n${packname}\n${botName}`,
                buttons: buttons,
                headerType: 4
                }
anita.sendMessage(i, buttonMessage, { quoted: vlive })
}
enviar(`*Transmision enviada con exito*`)
}
break

case 'reiniciar':
if(!isOwner) return enviar(mess.owner)
enviar(`Reiniciando...`)
await sleep(2000)
process.exit()
break

	// Text Pro
		case 'pencil': case 'glitch': case'glitch2': case 'glitchtiktok': case 'berry': case 'blackpink': case 'neon': case 'logobear': case '3dchristmas': case 'thunder': case '3dbox': case 'video-game-classic': case 'marvel-studios': case 'ninja-logo': case 'green-horror': case 'magma': case '3d-neon-light': case '3d-orange-juice': case 'chocolate-cake': case '3dcrackedstone': case 'strawberry': {
                if (!q) throw `Ejemplo : ${prefix + command} DekuBot`
                enviar(mess.wait)
                anita.sendMessage(from, { image: { url: `https://danzzapi.xyz/api/textpro/${command}?text=${q}&apikey=danzz` }, caption: `${botName}` }, { quoted: info })
	    }
        break
            
        // Photo Oxy
	    case 'flaming': case 'shadow-sky': case 'metallic': case 'pubg': case 'naruto': case 'under-grass': case 'harry-potter': case 'flower-typography': case 'night-sky': {
                if (!q) throw 'Y el texto para el logo?'
                enviar(mess.wait)
                anita.sendMessage(from, { image: { url: `https://danzzapi.xyz/api/photooxy/${command}?text=${q}&apikey=danzz` }, caption: `${botName}` }, { quoted: info })
            }
            break
            
         
         //Comando de grupos
case 'hidetag':
if (!isGroup) return enviar(mess.groups)
if (!isGroupAdmins) return enviar(mess.admin)
if (!isBotGroupAdmins) return enviar(mess.botAdmin)
        anita.sendMessage(from, { text: q ? q : '', mentions: participantss.map(a => a.id) }, { quoted: info })
        break;

case 'tagall': case 'infoall':
if (!isGroup) return enviar(mess.groups)
if (!isGroupAdmins) return enviar(mess.admin)
if (!isBotGroupAdmins) return enviar(mess.botAdmin)
                let tekss = `══✪〘 *👥 Mention All* 〙✪══\n\n➲ *Message : ${q ? q : 'Nothing'}*\n\n`
		      	for (let mem of participants) {
		            tekss += `🏅 @${mem.id.split('@')[0]}\n`
				}
                tekss += `\n⋙ *${botName}* ⋘`
                anita.sendMessage(from, { text: tekss, mentions: participants.map(a => a.id) }, { quoted: info })
            break

case 'frigod':
if (!isGroup) return enviar(mess.groups)
                let tekoss = `══✪〘 *JAHUGA FRIGOD* 〙✪══\n*`
		      	for (let mem of participants) {
		            tekoss += `🏅 @${mem.id.split('@')[0]}\n`
				}
                tekoss += `\n⋙ *${botName}* ⋘`
                anita.sendMessage(from, { text: tekoss, mentions: participants.map(a => a.id) }, { quoted: info })
            break
        
         case 'add': case 'unkick': case 'reviver':
if (!isGroup) return enviar(mess.groups)
if (!isGroupAdmins) return enviar(mess.admin)
if (!isBotGroupAdmins) return enviar(mess.botAdmin)
if(!q && info.message.extendedTextMessage === null) return enviar('𝑴𝒂𝒓𝒄𝒂 𝒖𝒏 𝒎𝒆𝒏𝒔𝒂𝒋𝒆 𝒅𝒆𝒍 𝒖𝒔𝒖𝒂𝒓𝒊𝒐 𝒐 𝒆𝒔𝒄𝒓𝒊𝒃𝒆 𝒔𝒖 𝒏𝒖𝒎𝒆𝒓𝒐 𝒊𝒏𝒄𝒍𝒖𝒚𝒆𝒏𝒅𝒐 𝒆𝒍 + 𝒚 𝒆𝒍 𝒄𝒐𝒅𝒊𝒈𝒐 𝒅𝒆𝒍 𝒑𝒂𝒊𝒔 𝑬𝒋𝒆𝒎𝒑𝒍𝒐 *𝒂𝒅𝒅 +𝟓𝟗𝟓𝟗𝟗𝟒𝟗𝟔𝟔𝟒𝟒𝟗')
try {
useradd = `${args.join(" ").replace(/\D/g,'')}` ? `${args.join(" ").replace(/\D/g,'')}` : info.message.extendedTextMessage.contextInfo.participant
let id = `${useradd.replace(/\D/g,'')}`
if(!id) return enviar(`Ese numero no existe`)
let [result] = await anita.onWhatsApp(id)
if(!result) return enviar(`Esse número não está registrado no WhatsApp`)
let response = await anita.groupParticipantsUpdate(from, [result.jid], "add")
if(response[0].status == "409") {
return enviar('𝑬𝒔𝒆 𝒏𝒖𝒎𝒆𝒓𝒐 𝒚𝒂 𝒆𝒔𝒕𝒂 𝒆𝒏 𝒆𝒍 𝒈𝒓𝒖𝒑𝒐i')
} else if(response[0].status == "403") {
return enviar('𝑳𝒂 𝒄𝒖𝒆𝒏𝒕𝒂 𝒅𝒆 𝒆𝒔𝒆 𝒖𝒔𝒖𝒂𝒓𝒊𝒐 𝒆𝒔 𝒑𝒓𝒊𝒗𝒂𝒅𝒂')
} else if(response[0].status == "408") {
return enviar('𝑬𝒍 𝒖𝒔𝒖𝒂𝒓𝒊𝒐 𝒔𝒂𝒍𝒊𝒐 𝒉𝒂𝒄𝒆 𝒑𝒐𝒄𝒐 𝒕𝒊𝒆𝒎𝒑𝒐')
} else if(response[0].status == "401") {
return enviar('𝑬𝒍 𝒖𝒔𝒖𝒂𝒓𝒊𝒐 𝒎𝒆 𝒃𝒍𝒐𝒒𝒖𝒆𝒐')
} else if(response[0].status == "200") {
return enviar('𝑼𝒔𝒖𝒂𝒓𝒊𝒐 𝒂𝒈𝒓𝒆𝒈𝒂𝒅𝒐 𝒄𝒐𝒏 𝒆𝒙𝒊𝒕𝒐')
} else {
enviar(mess.error)
}
} catch {
}
break

   case 'ban': case 'kick':
if (!isGroup) return enviar(mess.groups)
if (!isGroupAdmins) return enviar(mess.admin)
if (!isBotGroupAdmins) return enviar(mess.botAdmin)
{
if (info.message.extendedTextMessage === undefined || info.message.extendedTextMessage === null) return enviar('𝑽𝒂𝒔 𝒂 𝒆𝒍𝒊𝒎𝒊𝒏𝒂𝒓 𝒂𝒍 𝒗𝒊𝒆𝒏𝒕𝒐?')
if(info.message.extendedTextMessage.contextInfo.participant !== null && info.message.extendedTextMessage.contextInfo.participant != undefined && info.message.extendedTextMessage.contextInfo.participant !== "") {
mentioned = info.message.extendedTextMessage.contextInfo.mentionedJid[0] ? info.message.extendedTextMessage.contextInfo.mentionedJid[0] : info.message.extendedTextMessage.contextInfo.participant
let responseb = await anita.groupParticipantsUpdate(from, [mentioned], 'remove')
if (responseb[0].status === "200") return enviar('𝑩𝒂𝒏𝒆𝒂𝒅𝒐 𝒄𝒐𝒏 𝒆𝒙𝒊𝒕𝒐️‍🌈')
else if (responseb[0].status === "406") return enviar('𝑵𝒐 𝒑𝒖𝒆𝒅𝒐 𝒆𝒍𝒊𝒎𝒊𝒏𝒂𝒓 𝒂𝒍 𝒄𝒓𝒆𝒂𝒅𝒐𝒓 𝒅𝒆𝒍 𝒈𝒓𝒖𝒑𝒐')
else if (responseb[0].status === "404") return enviar('𝑬𝒔𝒆 𝒖𝒔𝒖𝒂𝒓𝒊𝒐 𝒏𝒐 𝒆𝒔𝒕𝒂 𝒆𝒏 𝒆𝒍 𝒈𝒓𝒖𝒑𝒐')
else return enviar(mess.error)
} else if (info.message.extendedTextMessage.contextInfo.mentionedJid != null && info.message.extendedTextMessage.contextInfo.mentionedJid != undefined) {
mentioned = info.message.extendedTextMessage.contextInfo.mentionedJid
if(mentioned.length > 1) {
if(mentioned.length > groupMembers.length || mentioned.length === groupMembers.length || mentioned.length > groupMembers.length - 3) return enviar(`Vai arquivar msm??`)
sexocomrato = 0
for (let banned of mentioned) {
await sleep(100)
let responseb2 = await anita.groupParticipantsUpdate(from, [banned], 'remove')
if (responseb2[0].status === "200") sexocomrato = sexocomrato + 1
}
return enviar('Si lo envió, se envía.')
} else {
let responseb3 = await anita.groupParticipantsUpdate(from, [mentioned[0]], 'remove')
if (responseb3[0].status === "200") return enviar('𝑩𝒂𝒏𝒆𝒂𝒅𝒐 𝒄𝒐𝒏 𝒆𝒙𝒊𝒕𝒐')
else if (responseb3[0].status === "406") return enviar('𝑵𝒐 𝒑𝒖𝒆𝒅𝒐 𝒆𝒍𝒊𝒎𝒊𝒏𝒂𝒓 𝒂𝒍 𝒄𝒓𝒆𝒂𝒅𝒐𝒓 𝒅𝒆𝒍 𝒈𝒓𝒖𝒑𝒐')
else if (responseb3[0].status === "404") return enviar('𝑬𝒔𝒆 𝒖𝒔𝒖𝒂𝒓𝒊𝒐 𝒏𝒐 𝒆𝒔𝒕𝒂 𝒆𝒏 𝒆𝒍 𝒈𝒓𝒖𝒑𝒐')
else return enviar(mess.error)
}
}
}
break

case 'setfotogp': case 'fotogp':  
if (!isGroup) return enviar(mess.groups)
if (!isGroupAdmins) return enviar(mess.admin)
if (!isBotGroupAdmins) return enviar(mess.botadmin)
if (!isQuotedImage) return enviar(`Use: ${prefix + command} <Etiqueta una foto>`)
ftgp = isQuotedImage ? info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage : info.message.imageMessage
rane = getRandom('.'+await getExtension(ftgp.mimetype))
buffimg = await getFileBuffer(ftgp, 'image')
fs.writeFileSync(rane, buffimg)
medipp = rane 
try {
await anita.updateProfilePicture(from, {url: medipp})
enviar(`Foto del grupo editada con éxito`) 
} catch (err) {
enviar(mess.error)
}

break

case 'linkgrupo': case 'linkgp': {
                if (!isGroup) return enviar(mess.groups)
                if (!isGroupAdmins) return enviar(mess.admin)
                if (!isBotGroupAdmins) return enviar(mess.botadmin)
                enviar(mess.wait)
                let response = await anita.groupInviteCode(from)
                anita.sendMessage(from, {text: `https://chat.whatsapp.com/${response}\n\nLink del grupo : ${groupMetadata.subject}`}, {detectlink: true})
            }
            break

case 'setname': case 'nombregp': {
                if (!isGroup) return enviar(mess.group)
                if (!isBotGroupAdmins) return enviar(mess.botadmin)
                if (!isGroupAdmins) return enviar(mess.admin)
                if (!q) return enviar('Y el nombre ?')
                if (q > 25) return enviar('El nombre del grupo no puede tener mas de 25 carqcteres')
                await anita.groupUpdateSubject(from, q).then((res) => enviar('Nombre del grupo cbiado con exito')).catch((err) => enviar(jsonformat(err)))
            }
            break

          case 'setdesc': case 'descgp': {
                if (!isGroup) return enviar(mess.group)
                if (!isBotGroupAdmins) return enviar(mess.botadmin)
                if (!isGroupAdmins) return enviar(mess.admin)
                if (!q) return enviar('Y la descripción ?')
                if (q > 2000) return enviar('La descripción del grupo no puede tener mas de 2000 carqcteres')
                await anita.groupUpdateDescription(from, q).then((res) => enviar('Descripcion cambiada con exito')).catch((err) => enviar(jsonformat(err)))
            }
            break

               case 'grupo': case 'group': {
                let buttons = [
                        { buttonId: `${prefix}grrupo open`, buttonText: { displayText: 'Abrir 🔓' }, type: 1 },
                        { buttonId: `${prefix}grrupo close`, buttonText: { displayText: 'Cerrar 🔒' }, type: 1 }
                    ]
                    let butttonMessage = {
                    text: '✧━━━━━━[ *Modo de grupo* ]━━━━━━✧',
                    buttons: buttons,
                    footer: `${botName}`,
                    headerType: 4
                    }
                    await anita.sendMessage(from, butttonMessage, { quoted: info })
            }
            break

case 'grrupo':
                if (!isGroup) return enviar(mess.group)
                if (!isBotGroupAdmins) return enviar(mess.botadmin)
                if (!isGroupAdmins) return enviar(mess.admin)
                if (args[0] === 'close'){
                    await anita.groupSettingUpdate(from, 'announcement').then((res) => enviar(`Grupo cerrado con éxito 🔒`)).catch((err) => enviar(jsonformat(err)))
                } else if (args[0] === 'open'){
                    await anita.groupSettingUpdate(from, 'not_announcement').then((res) => enviar(`Grupo abierto con éxito 🔓`)).catch((err) => enviar(jsonformat(err)))}
break

case 'tagall': {
                if (!isGroup) throw mess.group
                if (!isBotGroupAdmins) throw mess.botAdmin
                if (!isGroupAdmins) throw mess.admin
let teks = `══✪〘 *👥 Tag All* 〙✪══
 
 ➲ *Mensaje : ${q ? q : ' '}*\n\n`
                for (let mem of groupMembers) {
                teks += `⭔ @${mem.id.split('@')[0]}\n`
                }
                anita.sendMessage(from, { text: teks, mentions: groupMembers.map(a => a.id) }, { quoted: info })
                }
                break

case 'rankgay':
if(!isGroup) return enviar("Solo funciona en grupos")
membr = []
const gay1 = groupMembers
const gay2 = groupMembers
const gay3 = groupMembers
const gay4 = groupMembers
const gay5 = groupMembers
var porcent = porcentagem[Math.floor(Math.random() * porcentagem.length)] 
var porcent2 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent3 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent4 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent5 = porcentagem[Math.floor(Math.random() * porcentagem.length)] 
const gays1 = gay1[Math.floor(Math.random() * gay1.length)]
const gays2 = gay2[Math.floor(Math.random() * gay2.length)]
const gays3 = gay3[Math.floor(Math.random() * gay3.length)]
const gays4 = gay4[Math.floor(Math.random() * gay4.length)]
const gays5 = gay5[Math.floor(Math.random() * gay5.length)]
rankzingay = `
*Estos son los  Gays🏳️‍🌈 del grupo:*\n${groupName}\n
*╭────────────*
*│* 🏳️‍🌈 @${gays1.id.split('@')[0]}
*│➥ ${porcent} Gay*
*│* 🏳️‍🌈 @${gays2.id.split('@')[0]}
*│➥${porcent2} Gay*
*│* 🏳️‍🌈 @${gays3.id.split('@')[0]}
*│➥ ${porcent3} Gay*
*│* 🏳️‍🌈 @${gays4.id.split('@')[0]}
*│➥ ${porcent4} Gay*
*│* 🏳️‍🌈 @${gays5.id.split('@')[0]}
*│➥ ${porcent5} Gay*
*╰────────────*
\n*🔥${botName}🔥*`
membr.push(gays1.id)
membr.push(gays2.id)
membr.push(gays3.id)
membr.push(gays4.id)
membr.push(gays5.id)
anita.sendMessage(from, {text: rankzingay, mentions: membr}, {quoted: info})
break

case 'rankpuñetero':
case 'rankpajero':
if(!isGroup) return enviar("Solo funciona en grupos")
membr = []
const puñetero1 = groupMembers
const puñetero2 = groupMembers
const puñetero3 = groupMembers
const puñetero4 = groupMembers
const puñetero5 = groupMembers
var porcent = porcentagem[Math.floor(Math.random() * porcentagem.length)] 
var porcent2 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent3 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent4 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent5 = porcentagem[Math.floor(Math.random() * porcentagem.length)] 
const puñeteros1 = puñetero1[Math.floor(Math.random() * puñetero1.length)]
const puñeteros2 = puñetero2[Math.floor(Math.random() * puñetero2.length)]
const puñeteros3 = puñetero3[Math.floor(Math.random() * puñetero3.length)]
const puñeteros4 = puñetero4[Math.floor(Math.random() * puñetero4.length)]
const puñeteros5 = puñetero5[Math.floor(Math.random() * puñetero5.length)]
rankzinpuñetero = `
*Estos son los puñeteros del grupo:*\n${groupName}\n
*╭────────────*
*│* @${puñeteros1.id.split('@')[0]}
*│➥ ${porcent} puñetero*
*│*  @${puñeteros2.id.split('@')[0]}
*│➥${porcent2} puñetero*
*│*  @${puñeteros3.id.split('@')[0]}
*│➥ ${porcent3} puñetero*
*│*  @${puñeteros4.id.split('@')[0]}
*│➥ ${porcent4} puñetero*
*│*  @${puñeteros5.id.split('@')[0]}
*│➥ ${porcent5} puñetero*
*╰────────────*
\n*🔥${botName}🔥*`
membr.push(puñeteros1.id)
membr.push(puñeteros2.id)
membr.push(puñeteros3.id)
membr.push(puñeteros4.id)
membr.push(puñeteros5.id)
anita.sendMessage(from, {text: rankzinpuñetero, mentions: membr}, {quoted: info})
break

case 'ranknazi':
if(!isGroup) return enviar("Solo funciona en grupos")
membr = []
const nazi1 = groupMembers
const nazi2 = groupMembers
const nazi3 = groupMembers
const nazi4 = groupMembers
const nazi5 = groupMembers
var porcent = porcentagem[Math.floor(Math.random() * porcentagem.length)] 
var porcent2 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent3 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent4 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent5 = porcentagem[Math.floor(Math.random() * porcentagem.length)] 
const nazis1 = nazi1[Math.floor(Math.random() * nazi1.length)]
const nazis2 = nazi2[Math.floor(Math.random() * nazi2.length)]
const nazis3 = nazi3[Math.floor(Math.random() * nazi3.length)]
const nazis4 = nazi4[Math.floor(Math.random() * nazi4.length)]
const nazis5 = nazi5[Math.floor(Math.random() * nazi5.length)]
rankzinnazi = `
*Estos son los Nazis 卐 del grupo:*\n${groupName}\n
*╭────────────*
*│* 卐 @${nazis1.id.split('@')[0]}
*│➥ ${porcent} nazi*
*│* 卐 @${nazis2.id.split('@')[0]}
*│➥${porcent2} nazi*
*│* 卐 @${nazis3.id.split('@')[0]}
*│➥ ${porcent3} nazi*
*│* 卐 @${nazis4.id.split('@')[0]}
*│➥ ${porcent4} nazi*
*│* 卐 @${nazis5.id.split('@')[0]}
*│➥ ${porcent5} nazi*
*╰────────────*
\n*🔥${botName}🔥*`
membr.push(nazis1.id)
membr.push(nazis2.id)
membr.push(nazis3.id)
membr.push(nazis4.id)
membr.push(nazis5.id)
anita.sendMessage(from, {text: rankzinnazi, mentions: membr}, {quoted: info})
break

case 'rankhetero':
if(!isGroup) return enviar("Solo funciona en grupos")
membr = []
const hetero1 = groupMembers
const hetero2 = groupMembers
const hetero3 = groupMembers
const hetero4 = groupMembers
const hetero5 = groupMembers
var porcent = porcentagem[Math.floor(Math.random() * porcentagem.length)] 
var porcent2 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent3 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent4 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent5 = porcentagem[Math.floor(Math.random() * porcentagem.length)] 
const heteros1 = hetero1[Math.floor(Math.random() * hetero1.length)]
const heteros2 = hetero2[Math.floor(Math.random() * hetero2.length)]
const heteros3 = hetero3[Math.floor(Math.random() * hetero3.length)]
const heteros4 = hetero4[Math.floor(Math.random() * hetero4.length)]
const heteros5 = hetero5[Math.floor(Math.random() * hetero5.length)]
rankzinhetero = `
*Estos son los heteros 💥 del grupo:*\n${groupName}\n
*╭────────────*
*│* 💥 @${heteros1.id.split('@')[0]}
*│➥ ${porcent} Hétero*
*│* 💥 @${heteros2.id.split('@')[0]}
*│➥ ${porcent2} Hétero*
*│* 💥 @${heteros3.id.split('@')[0]}
*│➥ ${porcent3} Hétero*
*│* 💥 @${heteros4.id.split('@')[0]}
*│➥ ${porcent4} Hétero*
*│* 💥 @${heteros5.id.split('@')[0]}
*│➥ ${porcent5} Hétero*
*╰────────────*
\n*🔥${botName}🔥*`
membr.push(heteros1.id)
membr.push(heteros2.id)
membr.push(heteros3.id)
membr.push(heteros4.id)
membr.push(heteros5.id)
anita.sendMessage(from, {text: rankzinhetero, mentions: membr}, {quoted: info})
break

case 'ranknoob':
if(!isGroup) return enviar("Solo funciona en grupos")
membr = []
const noob1 = groupMembers
const noob2 = groupMembers
const noob3 = groupMembers
const noob4 = groupMembers
const noob5 = groupMembers
var porcent = porcentagem[Math.floor(Math.random() * porcentagem.length)] 
var porcent2 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent3 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent4 = porcentagem[Math.floor(Math.random() * porcentagem.length)]
var porcent5 = porcentagem[Math.floor(Math.random() * porcentagem.length)] 
const noobs1 = noob1[Math.floor(Math.random() * noob1.length)]
const noobs2 = noob2[Math.floor(Math.random() * noob2.length)]
const noobs3 = noob3[Math.floor(Math.random() * noob3.length)]
const noobs4 = noob4[Math.floor(Math.random() * noob4.length)]
const noobs5 = noob5[Math.floor(Math.random() * noob5.length)]
rankzinnoob = `
*Estos son los noobs 👻 del grupo:*\n${groupName}\n
*╭────────────*
*│* 👻 @${noobs1.id.split('@')[0]}
*│➥ ${porcent} noob*
*│* 👻 @${noobs2.id.split('@')[0]}
*│➥ ${porcent2} noob*
*│* 👻 @${noobs3.id.split('@')[0]}
*│➥ ${porcent3} noob*
*│* 👻 @${noobs4.id.split('@')[0]}
*│➥ ${porcent4} noob*
*│* 👻 @${noobs5.id.split('@')[0]}
*│➥ ${porcent5} noob*
*╰────────────*
\n*🔥${botName}🔥*`
membr.push(noobs1.id)
membr.push(noobs2.id)
membr.push(noobs3.id)
membr.push(noobs4.id)
membr.push(noobs5.id)
anita.sendMessage(from, {text: rankzinnoob, mentions: membr}, {quoted: info})
break

// menu make

case 'cuaderno':
if (!q) return enviar("Escribe un texto")
const cuaderno = await getBuffer(`http://apis.xditya.me/write?text=${q}`)
anita.sendMessage(from, {image: cuaderno}, {caption: botName}, {quoted: info})
break

case 'tourl':
   if (!isQuotedImage) return enviar('Marca una foto!');
   enviar(mess.wait);
   downloadAndSaveMediaMessage(info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage).then((anu) => {
    let {
     telegraph
    } = require('./lib/scraper/uploader.js');
    telegraph(anu).then((buffer) => {
     enviar(buffer)
    })
  })
break

case "toimg":
if (!isQuotedSticker) return enviar("Etiqueta un sticker")
buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, "image")
enviar(mess.wait)
try {
anita.sendMessage(from, 
{image: buff}, 
{quoted: info})
} catch(e) {
console.log(e)
enviar(mess.error)
}
break

case 'sticker': case 's':
enviar(mess.wait)
{
(async function () {
if (isMedia && !info.message.videoMessage || isQuotedImage) {
var encmedia = isQuotedImage ? info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage : info.message.imageMessage
rane = getRandom('.'+await getExtension(encmedia.mimetype))
buffimg = await getFileBuffer(encmedia, 'image')
fs.writeFileSync(rane, buffimg)
rano = getRandom('.webp')
exec(`ffmpeg -i ${rane} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 800:800 ${rano}`, (err) => {
fs.unlinkSync(rane)
// "android-app-store-link": "https://play.google.com/store/search?q=%2B55%2094%209147-2796%20%F0%9F%94%A5%F0%9F%94%A5%F0%9F%94%A5%F0%9F%94%A5%F0%9F%94%A5&c=apps",
var json = {
"sticker-pack-name": packname,
"sticker-pack-publisher": author
}
var exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
var jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
var exif = Buffer.concat([exifAttr, jsonBuff])
exif.writeUIntLE(jsonBuff.length, 14, 4)
let nomemeta = Math.floor(Math.random() * (99999 - 11111 + 1) + 11111)+".temp.exif"
fs.writeFileSync(`./${nomemeta}`, exif) 
exec(`webpmux -set exif ${nomemeta} ${rano} -o ${rano}`, () => {
anita.sendMessage(from, {sticker: fs.readFileSync(rano)}, {quoted: info})
fs.unlinkSync(nomemeta)
fs.unlinkSync(rano)
})
})
} else if (isMedia && info.message.videoMessage.seconds < 11 || isQuotedVideo && info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 35) {
var encmedia = isQuotedVideo ? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : info.message.videoMessage
rane = getRandom('.'+await getExtension(encmedia.mimetype))
buffimg = await getFileBuffer(encmedia, 'video')
fs.writeFileSync(rane, buffimg)
rano = getRandom('.webp')
await ffmpeg(`./${rane}`)
.inputFormat(rane.split('.')[1])
exec(`ffmpeg -i ${rane} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 200:200 ${rano}`, (err) => {
fs.unlinkSync(rane)
let json = {
"sticker-pack-name": packname,
"sticker-pack-publisher": author
}
let exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
let jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
let exif = Buffer.concat([exifAttr, jsonBuff])
exif.writeUIntLE(jsonBuff.length, 14, 4)
let nomemeta = "temp.exif"
fs.writeFileSync(`./${nomemeta}`, exif) 
exec(`webpmux -set exif ${nomemeta} ${rano} -o ${rano}`, () => {
anita.sendMessage(from, {sticker: fs.readFileSync(rano)}, {quoted: info})
fs.unlinkSync(nomemeta)
fs.unlinkSync(rano)
})
})
} else {
enviar(`Debes enviar o etiquetar una imagen o video que no dure más de 10 segundos`)
}
})().catch(e => {
console.log(e)
enviar(mess.error)
try {
if (fs.existsSync("temp.exif")) fs.unlinkSync("temp.exif");
if (fs.existsSync(rano)) fs.unlinkSync(rano);
if (fs.existsSync(media)) fs.unlinkSync(media);
} catch {}
})
}
break



   default:

}


      } catch (e) {
         console.log(red(e))
      }
      fs.watchFile('./index.js', (curr, prev) => {
         if (curr.mtime.getTime() !== prev.mtime.getTime()) {
            console.log(green("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\INDEX MODIFICADO.\nREINICIANDO..."));
            process.exit()
         }
      })
   })

}
startDeku()