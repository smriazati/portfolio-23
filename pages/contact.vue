<template>
    <div>
        <div class="text-wrapper">
            <h1 class="text-display-style">Contact</h1>
            <p>Get in touch using this form, or send me an email at sarahriazati@gmail.com.</p>
        </div>
        <div class="form-wrapper">
            <div v-if="!showThanks">
                <form id="contact" name="contact" method="post" netlify netlify-honeypot="bot-field" data-netlify="true"
                    @submit.prevent="onFormSubmit">
                    <input type="hidden" name="form-name" value="contact">
                    <label for="name">Name *</label>
                    <input type="text" name="name" required>
                    <label for="email">Email *</label>
                    <input type="email" name="email" required>
                    <label for="message">Message *</label>
                    <textarea name="message"></textarea>
                    <button class="btn-fill">Submit</button>
                </form>
            </div>
            <div v-else class="confirmation-wrapper">
                <p>Thanks for reaching out! Your message has been submitted.</p>
                <button class="btn-fill" @click="toggleShowThanks">Send another message</button>
            </div>
        </div>
    </div>
</template>
<script setup>
const showThanks = ref(false)
const toggleShowThanks = () => {
    showThanks.value = !showThanks.value;
}
const onFormSubmit = (e) => {
    let myForm = document.getElementById("subscribe");
    let formData = new FormData(myForm);
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
    })
        .then(result => showThanks.value = true)
        .catch((error) => console.log(error));
}
</script>

<style lang="scss" scoped>
.text-wrapper {
    padding: $spacer*2;
}

.form-wrapper {
    padding: $spacer*2;

}

.confirmation-wrapper {
    button {
        margin-top: $spacer*2;
    }
}


form {
    display: flex;
    flex-direction: column;
    max-width: 80ch;

    label {
        margin-bottom: $spacer;
        // @include titleStyle();
    }

    input,
    textarea {
        background: #efefef;
        border: 0;
        margin-bottom: $spacer;
        outline: 0;
        padding: $spacer;
        font-size: inherit;
        font-family: inherit;
        transition: 0.3s ease all;

        &:focus,
        &:hover {
            background: #efefff;
        }
    }

    input {
        height: 2rem;

    }

    input[type="submit"] {
        @include titleStyle();
        display: flex;
        justify-content: center;
        text-align: center;
        height: auto;
        padding: $spacer
    }


}
</style>