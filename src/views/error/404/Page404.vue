<template>
  <error-content code="404" desc="Oh~~您的页面好像飞走了~" :src="src" />
</template>

<script>
import ErrorContent from '../ErrorContent';
import error404 from '@/assets/images/error/error-404.svg';

export default {
  name: 'NotFound',
  components: {
    ErrorContent
  },
  data: () => ({
    src: error404
  })
};
</script>
