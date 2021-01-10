<template>
  <div>
    <router-link to="/" class="nav-link">Back</router-link>
    <div class="saves-cont">
      <div v-if="saves.length === 0" class="save placeholder">
        <div class="empty-text">Your presets will be stored here</div>
        <img class="img-placeholder" src="../assets/flower.png" alt="" />
      </div>

      <div v-for="(save, index) in saves" :key="index" class="save">
        <div class="time">
          {{ getDate(index) }} |
          {{ getTime(index) }}
        </div>
        <div class="icons">
          <div>
            <ion-icon
              @click="deleteSave(index)"
              name="trash"
              size="large"
            ></ion-icon>
          </div>

          <div>
            <ion-icon
              
              @click="share(save.query)"
              name="share"
              size="large"
              
            ></ion-icon>
          </div>
          <div>
            <a :href="save.query">
              <ion-icon size="large" name="play-circle"></ion-icon
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fileRead } from "../saves";
import { deleteSave } from "../saves";

import { IonIcon } from "@ionic/vue";
import { addIcons } from "ionicons";
import { playCircle, trash, share } from "ionicons/icons";

import { SocialSharing } from "@ionic-native/social-sharing/";
const socialSharing = SocialSharing;

export default {
  components: {
    IonIcon,
  },
  async created() {
    try {
      this.saves = await fileRead();
    } catch (error) {
      console.error(error);
    }
    addIcons({
      "play-circle": playCircle,
      trash,
      share,
    });
  },
  data() {
    return {
      saves: [],
    };
  },
  methods: {
    getDate(index) {
      const dateStr = this.saves[index].date;
      const date = new Date(+dateStr).toLocaleDateString();
      return date;
    },
    getTime(index) {
      const dateStr = this.saves[index].date;
      const time = new Date(+dateStr).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      return time;
    },
    deleteSave(index) {
      deleteSave(index);
      this.saves.pop(index);
    },
    share(link) {
      console.log("share!");
      const externalUrl =
        "https://tenori-on.netlify.app/" + "?" + link.split("?")[1];
      socialSharing.share(
        "Check out my cool pattern! \n",
        "MEDIUM",
        null,
        externalUrl
      );
    },
  },
};
</script>

<style scoped>
.saves-cont {
  margin-top: 30px;
}
.icon {
  width: 15px;
}

.save {
  box-sizing: border-box;
  outline: 3px solid rgb(161, 161, 161);
  margin: 15px;
  padding: 15px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time {
  margin-left: 5px;
  font-family: monospace;
  font-weight: 600;
}

ion-icon{ 
  width: 200px;
}

.icons {
  margin-right: 15px;
  margin-top: 5px;
  align-items: bottom;
  width: 40%;
  display: flex;
  justify-content: space-around;
  align-content: flex-end;
}

ion-icon {
  width: 25px;
  height: 25px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: rgb(224, 223, 223);
  padding: 5px;
  color: rgb(212, 161, 151);
  border-radius: 10%;
}

.placeholder {
  display: flex;
  justify-content: space-between;
  font-family: monospace;
  display: flex;
  padding: 0px;
}

.empty-text {
  padding: 20px;
  padding-left: 40px;
}

.img-placeholder {
  align-self: flex-end;
  align-items: flex-end;
}
</style>