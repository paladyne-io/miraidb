<template>
    <div class="section-padding" data-bg-color="#f8faff">
        <div class="container">
            <!-- Section Title Start data-aos="fade-up" -->
            <div class="section-title text-center mb-60" >
                <h2 class="title"> {{ team_page_heading }}</h2>
                <p class="sub-title">{{ team_page_subtitle }} </p>
            </div>
            <!-- Section Title End -->

            <div class="row row-cols-lg-4 row-cols-sm-2 row-cols-1 mtn-30">
                <div class="col mt-30" v-for="(team, index) in teamData.slice(0, 2)" :key="index">
                    <TeamMember :team="team" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import teamData from '~/data/team.json';

    export default {
        components: {
            TeamMember: () => import('@/components/TeamMember'),
        },

        data() {
            return {
                teamData,
                team_page_heading: this.$t('team_page_heading'),
                team_page_subtitle: this.$t('team_page_subtitle'),
            }
        },
    };
</script>
