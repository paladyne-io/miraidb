<template>
    <div class="section-padding-top section-padding-bottom-180">
        <div class="container">
            <div class="row">
                <div class="col-xl-7 col-lg-6 col-12">
                    <div class="about-image-area">
                        <div class="about-image js-tilt">
                            <img src="/images/about/nodescan/nodescan_client.png" alt="Nodescan client screenshot">
                        </div>
                        <div class="about-image js-tilt">
                            <img src="/images/about/nodescan/nodescan_filesharing.png " alt="Nodescan file sharing screenshot">
                        </div>
                        
                        <!-- Animation Shape Start -->
                        <ShapeWithAnimation addClassName="shape-1" data-depth="1" imgSrc="/images/shape-animation/about-shape-1.png" />
                    </div>
                </div>
                <div class="col-xl-5 col-lg-6 col-12" >
                    <div class="about-content-area about-four">
                        <div class="section-title-two">
                            <span class="sub-title">web services</span>
                            <h3 class="title">Nodescan</h3>
                        </div>
                        <p>Nodescan is a server-client application written in Java to allow people to share and communicate privately. 
                        Run your own server! </p>
                        <a href="http://www.nodescan.com" class="btn btn-primary btn-hover-secondary mt-30">Try it now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            ShapeWithAnimation: () => import('@/components/ShapeWithAnimation')
        },
    };
</script>