<template>
  <div>
    <router-link to="/" class="nav-link">Back</router-link>
    <div class="desc">
      <div class="text">
        Tenori-on is an instrument created by Toshio Iwai in 2007. It consists
        of a hand-held screen comprised from sixteen-by-sixteen grid of LED
        switches. Any of these switches may be activated in a number of
        different ways to create sounds.
        <br />
        <br />
        Here's what the creator has to say:
        <br />
        <br />
        <div class="quote">
          In days gone by, a musical instrument had to have a beauty, of shape
          as well as of sound, and had to fit the player almost organically.
          Modern electronic instruments don't have this inevitable relationship
          between the shape, the sound, and the player.
          <br />
          <br />What I have done is to try to bring back these elements and
          build them in to a true musical instrument for the digital age.
        </div>
        <br />
      <br />

      <br />
      <span class="credentials">
      Made with ♥ by @valerih12
      <br />
      <a href="https://github.com/valerih12">Github page</a>
    </span>

      </div>

          </div>
    
  </div>
</template>


<style scoped>
.desc {
  margin-top: 2em;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
}

.quote {
  background-color: rgb(212, 161, 151);
  padding: 2em;
}

.credentials {
  font-family: monospace;
  color: rgb(212, 161, 151);
  text-align: left;
}
.text {
  width: 360px;
}

.video {
  align-self: center;
  text-align: center;
}
</style>