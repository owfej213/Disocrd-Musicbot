import { useHistory } from 'discord-player';
import { ErrorEmbed, SuccessEmbed } from '../modules/embeds.js';

export const data = {
    id: 'back',
    category: 'music',
    queueOnly: true,
    validateVC: true,
};

export async function execute(interaction) {
    const history = useHistory(interaction.guildId);

    if (history.isEmpty()) {
        return interaction.reply({
            ephemeral: true,
            embeds: [ErrorEmbed('❌ 沒有上一首歌曲可以播放')],
        });
    }

    await interaction.deferReply();

    await history.previous();

    return interaction.editReply({
        embeds: [SuccessEmbed('⏮ 已回放上一首歌曲')],
    });
}
