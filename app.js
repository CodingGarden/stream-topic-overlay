const topicElement = document.querySelector('.topic');

const client = new tmi.Client({
  connection: { reconnect: true },
  channels: ['codinggarden'],
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  if (self) return;
  if (tags.badges.broadcaster || tags.badges.moderator) {
    const [command, ...args] = message.split(' ');
    if (command === '!settopic') {
      const topic = args.join(' ');
      setTopicOverlayText(topic);
      showTopicOverlay();
    } else if (command === '!hidetopic') {
      hideTopicOverlay();
    } else if (command === '!showtopic') {
      showTopicOverlay();
    }
  }
});

function showTopicOverlay(){
  topicElement.style.display = '';
}

function hideTopicOverlay(){
  topicElement.style.display = 'none';
}

function setTopicOverlayText(text){
  topicElement.textContent = text;
}