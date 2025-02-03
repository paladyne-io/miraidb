<template>
    <div class="team">
        <div class="thumb">
            <img :src="team.imgSrc" :alt="team.name">
        </div>
        <div class="team-info text-center">
            <div class="info">
                <h5>{{  $t(team.name) }}</h5>
                <span>{{ $t(team.position) }}</span>
                <span>{{ $t(team.languages) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['team']
    };
</script>
