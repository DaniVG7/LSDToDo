<script setup>
import { ref } from 'vue';

const showChat = ref(true);

const toggleView = () => {
    showChat.value = !showChat.value;
};


</script>

<template>
    <div class="messageContainer relative">
        <div :class="{ 'messageSidebar': true, 'hidden-mobile': showChat }">
            <!-- con esto se aplica el estilo messageSidebar siempre y hiden-mobile cuando showChat sea true -->
            <div class="card" style="background-color: #53BF9D; border: none;">
                <button class="toggleButton absolute" @click="toggleView" style="top: 2px; right: 10px;">
                    <i class="pi pi-bars" style="font-size: 20px; border: none;"></i>
                </button>
                <AvatarGroup>
                    <Avatar :image="'/demo/images/avatar/amyelsner.png'" size="large" shape="circle"></Avatar>
                    <Avatar :image="'/demo/images/avatar/asiyajavayant.png'" size="large" shape="circle"></Avatar>
                    <Avatar :image="'/demo/images/avatar/onyamalimba.png'" size="large" shape="circle"></Avatar>
                    <Avatar :image="'/demo/images/avatar/ionibowcher.png'" size="large" shape="circle"></Avatar>
                    <Avatar :image="'/demo/images/avatar/xuxuefeng.png'" size="large" shape="circle"></Avatar>
                    <Avatar label="+2" shape="circle" size="large"
                        :style="{ 'background-color': '#9c27b0', color: '#ffffff' }"></Avatar>
                </AvatarGroup>
            </div>
            <ul class="user-list">
                <li class="mb-5">
                    Gastón <span class="notification-bubble">3</span>
                </li>
                <li class="mb-5">
                    Adri <span class="notification-bubble">1</span>
                </li>
                <li class="focusedChat mb-5">
                    Sandy
                </li>
                <li class="mb-5">
                    Bruno <span class="notification-bubble">5</span>
                </li>
                <li class="mb-5">
                    Tincho <span class="notification-bubble">2</span>
                </li>
                <li class="mb-5">
                    Dani <span class="notification-bubble">9</span>
                </li>
                <li class="mb-5">
                    Rafaela <span class="notification-bubble">3</span>
                </li>
                <li class="mb-5">
                    Mirian
                </li>
            </ul>
        </div>
        <div :class="{ 'chat-container': true, 'hidden-mobile': !showChat }">
            <div class="chat-header" style="position: relative; height: 50px;">
                <h3 style="color:white"> Sandy's chat</h3>
                <i class="pi pi-bell " v-badge="2"></i>
            </div>
            <button class="toggleButton absolute" @click="toggleView" style="top: 2px; right: 10px;">
                <i class="pi pi-bars" style="font-size: 20px; border: none;"></i>
            </button>
            <div class="chat-messages px-5 py-5">
                <div class="message received">
                    <p>Hola, ¿cómo estás?</p>
                    <span class="timestamp">10:30 AM</span>
                </div>
                <div class="message sent">
                    <p>Estoy bien, gracias. ¿Y tú?</p>
                    <span class="timestamp" style="color: white;">10:32 AM</span>
                </div>
                <div class="message received">
                    <p>¡Todo bien también!</p>
                    <span class="timestamp">10:33 AM</span>
                </div>
            </div>
            <div class="chat-input" style="width: 100%;">
                <input type="text" placeholder="Escribe tu mensaje...">
                <button>Enviar</button>
            </div>
        </div>
    </div>
</template>

<style>
.messageContainer {
    display: flex;
    flex-direction: column;
    max-width: 1400px;
    height: 80vh;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.messageSidebar {
    padding: 20px;
    padding-top: 0;
    background-color: #53BF9D;
    color: #fff;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    width: 100%;
}

.messageSidebar h2 {
    margin-top: 0;
}

.user-list {
    list-style-type: none;
    padding: 0;
}

.user-list li {
    padding: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.notification-bubble {
    background-color: white;
    color: #53BF9D;
    font-weight: bolder;
    border-radius: 50%;
    padding: 5px 10px;
    font-size: 0.8em;
}

.chat-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    width: 100%;
}

.chat-header {
    padding: 10px;
    background-color: #53BF9D;
    color: #fff;
    text-align: center;
    border-top-right-radius: 8px;
}

.chat-messages {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
    border-bottom: 1px solid #f2f2f2;
}

.message {
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    max-width: 80%;
}

.message.received {
    background-color: #f1f1f1;
    align-self: flex-start;
}

.message.sent {
    background-color: #53BF9D;
    color: #fff;
    align-self: flex-end;
}

.timestamp {
    display: block;
    font-size: 0.8em;
    color: #666;
    margin-top: 5px;
}

.chat-input {
    display: flex;
    padding: 10px;
    background-color: #f2f2f2;
    border-bottom-right-radius: 8px;
    width: 100%;
}

.chat-input input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-right: 10px;
    width: calc(100% - 120px);
}

.chat-input button {
    padding: 10px 20px;
    border: none;
    background-color: #53BF9D;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;
    width: 100px;
}

.chat-input button:hover {
    background-color: rgb(94, 197, 94);
}

.toggleButton {
    padding: 5px 5px;
    margin: 10px;
    border: none;
    background-color: #53BF9D;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.8s;
}

.toggleButton:hover {
    transform: rotate(360deg);
    padding: 5px;
}

.focusedChat {
    background-color: #ffffff !important;
    color: rgb(161, 84, 161);
    padding: 20px !important;
    border-radius: 8px;
}

.p-badge {
    background: white !important;
    color: green !important;
}

.hidden-mobile {
    display: none;
}

.pi-bell {
    position: absolute;
    left: 20px;
    top: 15px;
    font-size: 2rem;
}

/* Responsive Styles */
@media (min-width: 768px) {
    .messageContainer {
        flex-direction: row;
    }

    .messageSidebar {
        width: 500px;
        height: 100%;
        padding-bottom: 20px;
        display: block !important;
        overflow: auto;
        /* Barra para hacer scroll */
    }

    .chat-container {
        flex-grow: 1;
    }

    .chat-messages {
        flex-grow: 1;
        height: 100%;
    }

    .chat-input {
        width: 100%;
    }

    .toggleButton {
        display: none;
    }

    .pi-bell {
        position: absolute;
        font-size: 2rem;
        right: 20px;
        left: auto;
    }
}
</style>
