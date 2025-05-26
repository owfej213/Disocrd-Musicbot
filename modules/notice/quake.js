import 'dotenv/config';
import axios from 'axios';
import dayjs from 'dayjs';
import { BaseEmbed } from '../embeds.js';

export default async (client) => {
    const quakeNoticeData = await client.db.get('quake_notice');

    const response = await axios({
        url: 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/E-A0015-001',
        method: 'GET',
        params: {
            Authorization: process.env.OPEN_WEATHER_DATA,
        },
    });

    if (response.data.records.Earthquake.length === 0) {
        return;
    }

    const { EarthquakeNo } = response.data.records.Earthquake[0];

    const lastEarthquakeNo = await client.db.get(
        'quake_notice.last_earthquake',
    );

    if (!lastEarthquakeNo || EarthquakeNo !== lastEarthquakeNo) {
        await client.db.set('quake_notice.last_earthquake', EarthquakeNo);
    } else if (EarthquakeNo === lastEarthquakeNo) {
        // 沒有新的地震資訊
        return;
    }

    for (const [, channel] of Object.entries(quakeNoticeData)) {
        const textChannel = await client.channels.fetch(channel);

        const { ReportImageURI, EarthquakeInfo } =
            response.data.records.Earthquake[0];

        const { OriginTime, Epicenter, EarthquakeMagnitude, FocalDepth } =
            EarthquakeInfo;

        const unixTimestamp = dayjs(OriginTime).unix();

        const embed = BaseEmbed()
            .setTitle('台灣地震報告通知')
            .setImage(ReportImageURI)
            .setFields(
                {
                    name: `**發生時間**`,
                    value: `<t:${unixTimestamp}:F>`,
                },
                {
                    name: '**震央資訊**',
                    value: `${Epicenter.Location}`,
                },
                {
                    name: `**編號**`,
                    value: `${EarthquakeNo}`,
                    inline: true,
                },
                {
                    name: `**${EarthquakeMagnitude.MagnitudeType}**`,
                    value: `${EarthquakeMagnitude.MagnitudeValue}`,
                    inline: true,
                },
                {
                    name: `**深度**`,
                    value: `${FocalDepth} 公里`,
                    inline: true,
                },
            )
            .setFooter({
                text: '臺灣交通部中央氣象署',
                iconURL:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/ROC_Central_Weather_Bureau.svg/500px-ROC_Central_Weather_Bureau.svg.png',
            })
            .setTimestamp();

        return textChannel.send({ embeds: [embed] });
    }
};
