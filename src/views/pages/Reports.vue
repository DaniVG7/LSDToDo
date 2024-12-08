<script></script>
<template>
    <div><img src="../../../public/imagenes/reports.jpg" alt=""></div>
</template>
<style scoped>
img {
    width: 70vw;
    height: 81vh;
    mask-image: linear-gradient(to bottom, black 40%, transparent),
        linear-gradient(to top, black 90%, transparent),
        linear-gradient(to right, black 90%, transparent),
        linear-gradient(to left, black 90%, transparent);
    mask-composite: intersect;
}

@media (max-width: 700px) {

    img {
        height: 70vh;
        width: 95vw;
    }
}
</style>
