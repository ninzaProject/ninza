import consumer from "./consumer"

export function connectLadderGameChannel(recv_callback, self) {
  return consumer.subscriptions.create({ channel: "LadderGameChannel", user_id: sessionStorage.getItem('user_id')}, {     
    connected() {
      console.log("ladder game channel connected");
    },

    disconnected() {
      if (!self.score.isGameEnd())
        self.giveUpGame(false);
    },

    received(data) {
      recv_callback.bind(self)(data);
    },

    speak(msg) {
      this.perform("speak", msg );
    },
  })
}
