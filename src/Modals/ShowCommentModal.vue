<script setup lang="ts">
import CreateComment from "../components/CreateComment.vue";
import { onMounted, ref } from "vue";
import { getComments } from "../stores/getComments";
import { storeToRefs } from "pinia";
import { getPosts } from "../stores/getPosts";

const postsStore = getPosts();
const getAllPosts = postsStore.getAllPosts;
const commentStore = getComments();
const { allComments, postInfo } = storeToRefs(commentStore);
const getAllComments = commentStore.getAllComments;
const emit = defineEmits(["closeModal", "commentDone"]);
const props = defineProps({ id: Number });

let showComment = ref<Boolean>(localStorage.getItem("token") ? true : false);

window.addEventListener("storage", function ():void {
  if (
    !this.localStorage.getItem("token") ||
    !this.localStorage.getItem("user-info")
  ) {
    showComment.value = false;
    this.localStorage.clear();
  }
});

const callComments = async () => {
  await getAllComments();
  await getAllPosts();
  emit("commentDone");
};

onMounted(async () => {
  try {
    await getAllComments();
  } catch (e: any) {
    console.log(e.message);
  }
});
const useAvatar = (userName:string) => {
  return `https://ui-avatars.com/api/?background=random&name=${userName}`
}
</script>
<template>
  <div class="modal-mask">
    <div
      class="card my-5 shadow post-card modal-comment-container"
      v-for="post in postInfo"
      :key="post['id']"
    >
      <!-- post header -->
      <div class="card-header d-flex align-items-center gap-2">
        <img
        v-if="post['author']['profile_image']['length']>0"
        loading="lazy"
          class="rounded-circle border border-dark"
          :src="post['author']['profile_image']"
          alt="user img"
          width="40"
          height="40"
           
        />
      <img
      v-else
      loading="lazy"
        class="rounded-circle border border-dark"
        :src="useAvatar(post['author']['name'])"
        alt="user img"
        width="40"
        height="40"
         
      />

        <h6 class="user-name fw-bold">
          {{ post["author"]["username"] }}
        </h6>
        <button
          class="btn btn-outline-danger my-sm-0 close-modal"
          @click="$emit('closeModal')"
        >
          &#9587;
        </button>
      </div>
      <!-- post body -->
      <div class="card-body">
        <img loading="lazy" :src="post['image']" alt="" class="post-img"  />
        <small class="text-small">{{ post["created_at"] }}</small>
        <h5 class="card-title" v-if="post['title']">{{ post["title"] }}</h5>
        <p class="card-text" v-if="post['body']">
          {{ post["body"] }}
        </p>
      </div>
      <!-- post footer -->
      <div class="card-footer text-muted">
        <div class="footer-container">
          <div class="footer-list">
            <button class="btn p-0 fw-bold btn-comment">
              ({{ post["comments_count"] }}) comments
            </button>
          </div>

          <!-- comments -->
          <div class="comment-container">
            <ul
              v-for="comment in allComments"
              :key="comment['id']"
              class="comment-list"
            >
              <li>
                <div>
                  <img
                  v-if="comment['author']['profile_image']['length']>0"
                  loading="lazy"
                    class="rounded-circle border border-dark"
                    :src="comment['author']['profile_image']"
                    alt="user img"
                    width="40"
                    height="40"
                     
                  />
                  <img
                  v-else
                  loading="lazy"
                    class="rounded-circle border border-dark"
                    :src="useAvatar(comment['author']['name'])"
                    alt="user img"
                    width="40"
                    height="40"
                     
                  />
   
                  
                  <p>{{ comment["author"]["name"] }}</p>
                </div>
                <p>{{ comment["body"] }}</p>
              </li>
            </ul>
          </div>
          <!-- create comment -->
          <CreateComment
            v-if="showComment"
            :postId="props.id"
            @success="callComments"
          />
        </div>
      </div>
    </div>
  </div>
</template>
