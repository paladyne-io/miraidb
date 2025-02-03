<template>
    <div class="section-padding-t90-b100">
        <div class="container">
            <!-- Section Title Start -->
            <div class="section-title text-center" data-aos="fade-up">
                <h2 class="title fz-32">Crafting effective digital marketing, web development,<br>video content and communication design</h2>
            </div>
            <!-- Section Title End -->

            <div class="row row-cols-lg-3 row-cols-md-2 row-cols-1 mtn-30">
                <div class="col mt-30" v-for="(project, index) in projectData" :key="index">
                    <div class="work">
                        <div class="thumbnail">
                           <NuxtLink to="/project-details" class="image">
                                <img :src="project.imgSrc" :alt="project.title">
                            </NuxtLink>
                        </div>
                        <div class="info">
                            <h3 class="title">
                               <NuxtLink to="/project-details">{{ project.title }}</NuxtLink>
                            </h3>
                            <p class="desc">{{ project.desc }}</p>
                           <NuxtLink to="/project-details">View Project</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import projectData from "~/data/project.json"

    export default {
        data() {
            return {
                projectData
            }
        },
    };
</script>
