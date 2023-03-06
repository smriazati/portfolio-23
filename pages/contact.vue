<template>
    <div>
        <div class="text-wrapper">
            <h1 class="text-display-style">Contact</h1>
            <p>Get in touch using this form, or send me an email at sarahriazati@gmail.com.</p>
        </div>
        <div class="form-wrapper">
            <form action="">
                <label for="name">Your name</label>
                <input name="name" type="name">
                <label for="email">Your email</label>
                <input name="email" type="email">
                <label for="message">Your message</label>
                <textarea name="message" rows="10"></textarea>
                <input type="submit">
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.text-wrapper {
    padding: $spacer*2;
}

form {
    display: flex;
    flex-direction: column;
    max-width: 80ch;
    padding: $spacer*2;

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