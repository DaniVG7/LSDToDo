<script setup>
import { ref, onMounted } from 'vue';
import { teamImages   } from '../../service/teamImages'; // Ajusta la ruta si es necesario

const images = ref([]);
const responsiveOptions = ref([
    {
        breakpoint: '1300px',
        numVisible: 4
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
]);

onMounted(() => {
    const data = teamImages  .getImages();
    images.value = data;
});

</script>

<template>
    <h1> <span style="color: rgb(166 166 237);">FELI</span><span style="color: white;">CID</span><span
            style="color: rgb(166 166 237)">ADES</span> <span style="color: red;">CAM</span><span
            style="color: rgb(232, 226, 48);">PE</span><span style="color: red;">ONES</span> </h1>
    <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="3"
        containerStyle="max-width: 900px; margin: auto;">
        <template #item="slotProps">
            <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" />
        </template>
        <template #thumbnail="slotProps">
            <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" />
        </template>
    </Galleria>
</template>

<style>
.p-galleria-item-wrapper img {
    height: 500px;
    width: 100%;
    object-fit: cover;
    margin-top: 20px
}

.p-galleria-thumbnail-wrapper img {
    width: 200px;
    height: 100px;
    object-fit: cover;
}

.p-galleria-thumbnail-container {
    background-color: transparent;
}

svg {
    color: black;
}

h1 {
    width: max-content;
    margin: auto;
    border-radius: 10px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 80px;
    font-weight: bolder;
    text-shadow: 0 0 10px black;
    letter-spacing: 10px;
    transition: 1s;
    position: relative;
}

h1::after {
    content: "";
    /* Inserta un contenido vacío. Es necesario para que el pseudo-elemento sea renderizado. */
    position: absolute;
    /* Posiciona el pseudo-elemento de forma absoluta respecto al <h1>. */
    left: 0;
    /* Alinea el pseudo-elemento al lado izquierdo del <h1>. */
    bottom: 10px;
    /* Desplaza el pseudo-elemento 10 píxeles hacia abajo desde la parte inferior del <h1>. */
    height: 5px;
    /* Define la altura del pseudo-elemento, que actúa como el grosor del subrayado. */
    width: 100%;
    /* Hace que el pseudo-elemento tenga el mismo ancho que el <h1>. */
    background: linear-gradient(to right, rgb(166 166 237)0%, white 25%, rgb(166 166 237) 50%, red 55%, yellow 75%, red 100%);
    /* Crea un gradiente lineal que simula los colores de las banderas de Argentina y España. */
    border-radius: 2px;
    /* Redondea ligeramente las esquinas del pseudo-elemento. */
}

h1:hover {
    color: white;
    transform: scale3d(1.1, 1.1, 1.1);
}

@media(max-width: 800px) {
    h1 {
        font-size: 40px;
        width: 100vw;
        letter-spacing: 0;
        text-align: center;
        margin-left: -30px;
    }

    h1::after {
        display: none;
    }

    .p-galleria-item-wrapper img {
        margin-top: 20px;
        width: 100vw;
        height: 350px;
        object-fit: cover;
    }

    .p-galleria-thumbnail-wrapper img {
        width: 100%;
        height: 50px;
        object-fit: cover;
    }
}
</style>
