export default function useMaxLength(gridSizes){
    const maxlength = computed(() => gridSizes.value.toString().length);

    return { maxlength }
}