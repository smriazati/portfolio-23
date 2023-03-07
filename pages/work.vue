<template>
    <div class="work-page">
        <header>
            <h1 class="text-display-style">Work</h1>
        </header>
        <div class="filters-wrapper">
            <div v-if="data?.categories" class="filters-section">
                <p class="text-display-sm-style">Categories</p>
                <ul class="filter-list-wrapper row row-wrap no-break">
                    <li v-for="item in data.categories" :key="item._id" @click="toggleFilterCategory(item?.name)"
                        :class="activeFilterCategory.includes(item.name) ? 'active' : ''">{{ item?.name }}
                    </li>
                    <li @click="clearFilterCategory" class="muted">Clear All</li>
                </ul>
            </div>
            <div v-if="data?.projectTypes" class="filters-section">
                <p class="text-display-sm-style">Roles</p>
                <ul class="filter-list-wrapper row row-wrap no-break">
                    <li v-for="item in data.projectTypes" :key="item._id" @click="toggleFilterRole(item?.name)"
                        :class="activeFilterRole.includes(item.name) ? 'active' : ''">{{ item?.name
                        }}
                    </li>
                    <li @click="clearFilterRole" class="muted">Clear All</li>
                </ul>
            </div>
            <!-- <p class="results-count" v-if="results">Showing {{ results.length }} projects</p> -->
        </div>
        <div v-if="results" class="results-container">
            <div v-if="results.length === 0" class="no-results-wrapper">
                <div class="text-wrapper">
                    <p>No results</p>
                </div>
                <div class="button-wrapper">
                    <button @click="clearAllFilters" class="btn-fill">Clear filters</button>
                </div>
            </div>
            <div v-else>
                <WorkCardGrid :data="results"></WorkCardGrid>
            </div>
        </div>
        <div v-else>
            <LoadingAnimation></LoadingAnimation>
        </div>
    </div>
</template>
<script setup>

const projectQuery = `
_id, slug, name, tagline, disableProjectPage,hideFromGrid, 
"vidTnail": vidTnail.asset->, 
"tnails": tnails[].asset->{url, altText}, 
"skills": skills[]->{
    name, 
    _id, 
    "image": image.asset->{url, altText}
  }|order(name asc),
categories[]->{name}, types[]->{name}
`
const query = groq`{ 
    "projects": *[_type == "project"]|order(orderRank){ ${projectQuery} }, 
    "projectTypes": *[_type == "projectType"]|order(orderRank), 
    "categories": *[_type == "category"] 
}`
const { data } = useSanityQuery(query)

const router = useRouter()
const route = useRoute()

useHead({
    title: 'Work',
})
const activeFilterRole = computed(() => route.query.role ? [route.query.role][0] : [])
const activeFilterCategory = computed(() => route.query.category ? [route.query.category][0] : [])

const toggleFilterCategory = (item) => {
    const queries = route.query.category;
    if (!queries) {
        router.push({
            path: '/work',
            query: { category: item, role: route.query.role },
        })
    } else if (typeof queries === "string") {
        if (queries == item) {
            router.push({
                path: '/work',
                query: { category: [], role: route.query.role },
            })
        } else {
            const arr = [queries, item]
            router.push({
                path: '/work',
                query: { category: arr, role: route.query.role },
            })
        }
    } else if (queries.includes(item)) {
        const arr = queries.slice();
        arr.splice(queries.indexOf(item), 1);
        router.push({
            path: '/work',
            query: { category: arr, role: route.query.role },
        })
    } else {
        router.push({
            path: '/work',
            query: { category: [item, ...queries] },
        })
    }
}
const clearFilterCategory = () => {
    router.push({
        path: '/work',
        query: { category: [], role: route.query.role },
    })
}
const clearFilterRole = () => {
    router.push({
        path: '/work',
        query: { role: [], category: route.query.category },
    })
}
const toggleFilterRole = (item) => {
    const queries = route.query.role;
    if (!queries) {
        router.push({
            path: '/work',
            query: { role: item, category: route.query.category },
        })
    } else if (typeof queries === "string") {
        if (queries == item) {
            router.push({
                path: '/work',
                query: { role: [], category: route.query.category },
            })
        } else {
            const arr = [queries, item]
            router.push({
                path: '/work',
                query: { role: arr, category: route.query.category },
            })
        }
    } else if (queries.includes(item)) {
        const arr = queries.slice();
        arr.splice(queries.indexOf(item), 1);
        router.push({
            path: '/work',
            query: { role: arr, category: route.query.category },
        })
    } else {
        router.push({
            path: '/work',
            query: { role: [item, ...queries], category: route.query.category },
        })
    }
}

const clearAllFilters = () => {
    router.push({
        path: '/work',
        query: { role: [], category: [] },
    })
}

const flattenArr = (arrToFlatten) => {
    const list = arrToFlatten;
    if (!list) return undefined
    if (list.length < 1) { return }
    const arr = list.map(item => item.name)
    return arr
}

const checkArrForVal = (filterArr, arrToCheck) => {
    if (!arrToCheck || !filterArr) { return false }
    if (typeof filterArr === 'string') {
        if (arrToCheck.includes(filterArr)) {
            return true
        } else {
            return false
        }
    } else {
        let matches = 0;
        filterArr.forEach(item => {
            if (arrToCheck.includes(item)) {
                matches++;
            }
        })
        if (matches === filterArr.length) {
            return true
        } else {
            return false
        }
    }
}

const results = computed(() => {

    return data.value?.projects.filter(item => {
        const itemCategories = flattenArr(item.categories)
        const itemRoles = flattenArr(item.types)

        const isFilteredCategories = activeFilterCategory.value.length > 0 ? true : false;
        const isFilteredRoles = activeFilterRole.value.length > 0 ? true : false;

        const hasCategories = checkArrForVal(activeFilterCategory.value, itemCategories);
        const hasRoles = checkArrForVal(activeFilterRole.value, itemRoles);

        if (isFilteredCategories && isFilteredRoles) {
            if (hasCategories && hasRoles) {
                return true
            } else {
                return false
            }
        } else if (isFilteredCategories) {
            if (hasCategories) {
                return true
            } else {
                return false
            }
        } else if (isFilteredRoles) {
            if (hasRoles) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    })

})

</script>

<style lang="scss" scoped>
.work-page {
    display: flex;
    flex-direction: column;
}

.section-title {
    margin-top: $spacer*4;
}

header,
.filters-section {
    padding: $spacer $spacer*2;

    @media (max-width: $collapse-bp) {
        padding: $spacer;
    }
}



header {
    padding-top: $spacer*2;
}


.filters-wrapper {
    .filters-section {
        display: flex;
        flex-direction: row;
        align-items: flex-start;

        @media (max-width: $collapse-bp) {
            flex-direction: column;
        }

        p {
            margin-right: $spacer;
        }

    }

    ul {

        li {
            margin: 0 $spacer * 0.3 $spacer * 0.3 $spacer * 0.3;

            @media (max-width: $collapse-bp) {
                margin: $spacer * 0.5 $spacer $spacer * 0.3 0;
            }

            &.muted {
                opacity: 0.5;
            }

            // &:not(:last-child) {
            //     margin-right: $spacer*0.5;
            // }

            &:hover,
            &.active {
                text-decoration: underline;
            }

            &:hover {
                cursor: pointer;
            }
        }
    }
}

.results-container {
    margin-top: $spacer*2;
}

.no-results-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: $spacer*2;

    @media(max-width: $collapse-bp) {
        padding: $spacer;
    }

    align-items: flex-start;

    .button-wrapper {
        margin-top: $spacer*2;
    }
}
</style>