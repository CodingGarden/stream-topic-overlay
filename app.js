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
      topicElement.style.display = '';
      const topic = args.join(' ');
      topicElement.textContent = topic;
    } else if (command === '!hidetopic') {
      topicElement.style.display = 'none';
    } else if (command === '!showtopic') {
      topicElement.style.display = '';
    }
  }
});
