<template>
    <div>
        <ComFieldCopy v-if="type === 'copy'"></ComFieldCopy>
        <template v-else>
            {{ value }}
        </template>
    </div>
</template>
<script setup>
const props = defineProps({
    type: {
        type: String,
        default: "",
    },
    value: {
        type: [Number, String],
        default: "",
    },
    props: {
        type: Object,
        default: () => {},
    }
});
provide('value', props.value)
provide('props', props.props)
</script>
