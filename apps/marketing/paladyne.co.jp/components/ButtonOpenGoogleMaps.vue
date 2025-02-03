<template>
  <button class="OpenMapButton text-sm mb-16 p-2 border-2 border-gray-500 text-center rounded-full hover:border-blue-300 duration-1000"
       @click="openGoogleMap()">
       グーグルマップで見る
  </button>
</template>

<script>
 var mapURL = "https://www.google.com/maps/place/朝日ケ丘集会所/@34.746944,135.309855,16z/data=!4m5!3m4!1s0x6000f33ab53e152b:0x654e34b67d778057!8m2!3d34.7469641!4d135.3098517?hl=ja"

export default {
  name: "OpenMapButton",

  methods: {
      openGoogleMap() {
        console.log("openGoogleMap...")
        window.open(mapURL, "_blank");
      }
      /*

    <slot>Button</slot>
   <p class="py-4 w-64 text-2xl">Open Google Maps</p>

      item
        const urlSuffix = item["latitude_longitude"]
          ? item["latitude_longitude"]
          : item["street_address_1"] +
            ", " +
            item["street_address_2"] +
            ", " +
            item["city"] +
            ", " +
            item["postal_code"];

                window.open(
          "https://www.google.com/maps/search/?api=1&query=" + urlSuffix,
          "_blank"

          //window.open(mapURL, "_blank");
     */
    }
};
</script>
