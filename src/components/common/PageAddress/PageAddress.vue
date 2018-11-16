<template>
	<div class="address">{{ Path }}</div>
</template>

<script>
	export default {
		data () {
			return {
				Path: ''
			}
		},

		created () {
			this.Path = this.$route.meta.address;
		}
	}
</script>

<style scoped></style>