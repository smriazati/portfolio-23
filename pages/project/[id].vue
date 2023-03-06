<template>
    <div class="project-wrapper">
        <section v-if="data">
            <div class="text-wrapper">
                <h1 v-if="data.name" class="title-wrapper text-display-style">{{ data.name }}</h1>
                <h2 v-if="data.tagline" class="tagline-wrapper">{{ data.tagline }}</h2>
                <div v-if="data.overview?.rte" class="rte-wrapper">
                    <SanityContent :blocks="data.overview.rte" :serializers="serializers"></SanityContent>
                </div>
            </div>

            <div v-if="data.links" class="links-wrapper">
                <div v-for="item in data.links" :key="item._key">
                    <a class='btn-fill' :href="item.url" target="_blank">{{ item.text }}</a>
                </div>
            </div>
            <div v-if="data.types" class="roles-wrapper">
                <p class="text-display-sm-style">Role<span v-if="data.types.length > 1">s</span>:</p>
                <ul class="row">
                    <li v-for="(item, index) in data.types" :key="index">{{ item.name }}</li>
                </ul>
            </div>
            <div v-if="data.skills" class="skills-wrapper">
                <p class="text-display-sm-style">Skills &amp; Tools:</p>
                <SkillsList :data="data.skills"></SkillsList>
            </div>
            <div v-if="data.players" class="video-player-wrapper">
                <!-- {{ data.players }} -->
                <div v-for="item in data.players" :key="item._key">
                    <div v-if="item.name" class="video-title-wrapper text-display-sm-style">
                        {{ item.name }}
                    </div>
                    <div v-if="item.type === 'YouTube'">
                        <PlayerYoutube :id="item.videoId" :title="item.name"></PlayerYoutube>
                    </div>
                    <div v-if="item.type === 'vimeo'">
                        <PlayerVimeo :id="item.videoId" :title="item.name"></PlayerVimeo>
                    </div>
                </div>
            </div>
            <div v-if="data.gallery" class="gallery-wrapper">
                <ul>
                    <li v-for="item in data.gallery" :key="item._key">
                        <img :src="$urlFor(item.image.url).width(1080).url()" :alt="item.image?.altText">
                    </li>
                </ul>
            </div>
        </section>
        <footer>
            <NuxtLink to="/work">Back to all projects</NuxtLink>
        </footer>
    </div>
</template>
<script setup>
import LinkSerializer from '../../components/Link/Serializer.vue'

const route = useRoute()
const projectQuery = `
_id, slug, name, tagline, overview,
players, links,
gallery[]{_key, "image": asset->{url, altText}}, 
"vidTnail": vidTnail.asset->, 
"tnails": tnails[].asset->{url, altText}, 
skills[]->{name, _key, "image": image.asset->{url, altText}}, 
types[]->{name}
`
const query = groq`*[_type == "project" && slug.current == "${route.params.id}"][0]{
    ${projectQuery}
}`
const { data } = useSanityQuery(query)

// const { $urlFor } = useNuxtApp()
const serializers = {
    marks: {
        // internalLink: NuxtLink,
        externalLink: LinkSerializer,
    }
}
</script>
<style lang="scss" scoped>
.project-wrapper {
    position: relative;
    flex: 2;

    >section {
        padding: $spacer*4 $spacer*2 $spacer*8 $spacer*2;
    }
}

.gallery-wrapper {
    width: 100%;
    margin-top: $spacer*2;

    ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 25px;
        list-style: none;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
    }
}

.text-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: $spacer*2;

    .title-wrapper {
        text-align: left;
    }

    .tagline-wrapper {
        align-self: center;
    }

    .rte-wrapper {
        max-width: 70ch;
    }


}


.links-wrapper {
    margin-top: $spacer*2;
    // align-self: end;
    display: flex;
    // flex-direction: column;

    >div+div {
        margin-left: $spacer;
    }
}

.roles-wrapper {
    margin-top: $spacer*2;

    p {
        margin-right: 1ch;
    }

    ul {
        margin-top: $spacer*0.5;

        li:not(:last-child) {
            &:after {
                content: ",";
                margin-right: 2px;
            }
        }
    }
}

.skills-wrapper {
    margin-top: $spacer*2;
}

.skills-wrapper .skills-wrapper {
    margin-top: $spacer * 0.5;
}

.video-player-wrapper {
    max-width: 960px;
    margin-left: auto;
    margin-top: $spacer*2;

    >div+div {
        margin-top: $spacer*2;
    }

    .video-title-wrapper {
        margin-bottom: $spacer * 0.5;
    }
}

footer {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    width: 100%;

    a {
        background: #000;
        color: #fff;
        @include btnArrow;
        @include btnArrowBack;
        align-items: center;
        width: 100%;
        text-align: center;
        justify-content: center;
        padding: $spacer*2;

        &:hover {
            background: $highlight;
            color: #000
        }
    }
}
</style>