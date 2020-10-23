const YouTube = require('youtube-node');
const { key } = require('./tokens/youtube-token.json');

const youtube = new YouTube();
youtube.setKey(key);

function searchVideo(message, queryText){
  return new Promise( (resolve, reject) => {
    youtube.search(`Quadro em Branco ${queryText}`, 2, (error, result) => {
      if(!error){
        const channelId = result.items.map(item => item.id.channelId);
        if(channelId[0] === 'UCl79BVUfEZ830vH76L12ChA'){
          const videosIds = result.items.map(item => item.id.videoId).filter(item => item);
          const youtubeLinks = videosIds.map(videoId => `https://youtube.com/watch?v=${videoId}`);
          resolve(`${message} ${youtubeLinks[0]}`);
        }else{

          resolve(`Não encontrei! ): Mas tenta encontrar aí https://www.youtube.com/channel/UCl79BVUfEZ830vH76L12ChA`);
        }
      }else{
        reject('Deu pau!');
      }
    });
  })
}

module.exports.searchVideo = searchVideo;