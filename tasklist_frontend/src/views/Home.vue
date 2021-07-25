<template>
	<div class="ani-slideInDown row justify-content-center">
		<div class="col-lg-6">
			<ToDoInput @eventAddNewTask="onAddNewTask"/>

			<ul class="list mt-3">
				<ListItem v-for="item in itemList" :key="item.id" :text="item.text" :id="item.id" @eventTaskStatusChange="onTaskStatusChange" @eventTaskDelete="onTaskDelete" />
			</ul>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import ToDoInput from "@/components/ToDoInput.vue"
    import ListItem from "@/components/ListItem.vue"
    const axios = require('axios').default;


	export default {
		name: "home",
		components: {
			ToDoInput,
			ListItem
		},
		data() {
            return {
                itemList: []
            }
        },
        methods: {
			/**
			 * Event: add new task
			 */
			onAddNewTask(taskName) {
				const task = {
					text: taskName,
					isDone: "false"
                }

                axios.post('http://localhost:3000/api/task', task)
                this.loadItemList()
			},

            /**
             * Event: on task status changed
             */
            onTaskStatusChange(id, checked) {
                console.log(id, checked)

                let item = this.itemList.find(i => i.id == id)
                if (item) {
                    item.isDone = checked
                }
                
                console.log(this.itemList)
            },

            /**
             * Event: on task deleted
             */
            onTaskDelete(id) {
                // console.log(id)

                // let index = this.itemList.findIndex(i => i.id == id)
                // if (index > -1) {
                //     this.itemList.splice(index, 1)
                // }

                axios.delete('http://localhost:3000/api/task/' + id)
                this.loadItemList()
            },

            /**
             * Load item list from local storage
             */
            loadItemList() {
                axios.get('http://localhost:3000/api/tasks').then(response => (this.itemList = response.data))

                console.log("this.itemList =", this.itemList)
            },

            /**
             * Update the item list to local storage
             */
            updateItemList() {
                axios.put()
                localStorage.setItem("VuejsTodo", JSON.stringify(this.itemList))
            }
        },
        mounted() {
            // Load item list from local storage
            this.loadItemList()
        },
        watch: {
            itemList: {
                handler(value) {
                    console.log("item changed")

                    // save to localStorage
                    //this.updateItemList()
                },
                deep: true
            }
        }
	}
</script>
