<template>
    <footer class="site-footer">
        <ul class="row no-break">
            <li>
                <NuxtLink to="/">Home</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/work">Work</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/contact">Contact</NuxtLink>
            </li>
        </ul>
        <ul class="row no-break">
            <li>
                <a href="https://instagram.com/sriazati" target="_blank">
                    <Icon name="uil:instagram" />
                    <span class="visually-hidden">Instagram</span>
                </a>
            </li>
            <li>
                <a href="https://github.com/smriazati" target="_blank">
                    <Icon name="uil:github" />
                    <span class="visually-hidden">Github</span>
                </a>
            </li>
            <li>
                <a href="https://www.linkedin.com/in/sarah-riazati-37752513/" target="_blank">
                    <Icon name="uil:linkedin" />
                    <span class="visually-hidden">Linkedin</span>
                </a>
            </li>
        </ul>
    </footer>
</template>
<style lang="scss" scoped>
.site-footer {
    background: #000;
    transition: .3s ease all;
    padding: $spacer*2;
    display: flex;
    justify-content: space-between;


    a {
        color: #fff;
        transition: .3s ease all;

        &:hover {
            color: $highlight;
        }
    }

    ul {
        list-style: none;
        align-items: center;

        li {
            a {
                letter-spacing: 0;
                transition: .3s ease all;

                svg {
                    transition: .3s ease all;
                    font-size: 2rem;
                }

                &:hover {
                    letter-spacing: 1px;

                    svg {
                        font-size: 1.8rem;
                    }
                }
            }


            &:not(:last-child) {
                margin-right: $spacer;
            }
        }
    }
}
</style>