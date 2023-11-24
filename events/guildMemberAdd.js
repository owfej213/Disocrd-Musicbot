const Canvas = require('canvas')
const path = require('path')
const { AttachmentBuilder } = require('discord.js')
const { getChannelId } = require('../commands/message/settings/setwelcome')

module.exports = {
    name:'guildMemberAdd',

    async execute(member) {
        const { guild } = member
        const channelId = await getChannelId(guild.id)

        if(!channelId) return

        const channel = guild.channels.cache.get(channelId)

        if(!channel) return

        const canvas = Canvas.createCanvas(700, 300)
        const ctx = canvas.getContext('2d')
        const bg = await Canvas.loadImage(
            path.join(__dirname, '../misc/pictures/bg.png')
        )
        let x = 0
        let y = 0
        ctx.drawImage(bg, x, y)

        x = 35
        y = 35
        let radius = 15
        let width = 630
        let height = 230
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fillStyle = 'rgba(92, 92, 92, 0.75)'
        ctx.fill()
        const pfp = await Canvas.loadImage(
            member.user.displayAvatarURL({
                extension: 'png'
            })
        )
        x = canvas.width / 2 - pfp.width / 2
        y = 50

        ctx.save()
        ctx.beginPath()
        ctx.arc(canvas.width / 2, 114, 67, 0, Math.PI * 2, false)
        ctx.clip()
        ctx.fillStyle = 'rgba(225, 225, 225, 1)'
        ctx.fillRect(canvas.width / 2 - pfp.width / 2 - 3, 47, 134, 134)
        ctx.restore()

        ctx.save()
        ctx.beginPath()
        ctx.arc(canvas.width / 2, 114, 64, 0, Math.PI * 2, false)
        ctx.clip()
        ctx.drawImage(pfp, x, y)
        ctx.restore()

        ctx.fillStyle = '#ffffff'
        ctx.font = '30px sans-serif'
        let text = `Welcome ${member.user.tag}`
        x = canvas.width / 2 - ctx.measureText(text).width / 2
        ctx.fillText(text, x, 90 + pfp.height)

        ctx.font = '25px sans-serif'
        text = `Member #${guild.memberCount}`
        x = canvas.width / 2 - ctx.measureText(text).width / 2
        ctx.fillText(text, x, 120 + pfp.height)

        const attachment = new AttachmentBuilder(canvas.toBuffer())

        channel.send({files: [ attachment ]})
    }
}