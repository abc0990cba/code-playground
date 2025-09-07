links:
- https://go101.org/article/channel-closing.html
- https://www.leolara.me/blog/closing_a_go_channel_written_by_several_goroutines/
- https://udhos.github.io/golang-concurrency-tricks/
- https://reliasoftware.com/blog/golang-concurrency-patterns


|           | Opened                     | Closed                  | Uninitialized (nil) |
|-----------|----------------------------|-------------------------|---------------------|
| **Read**  | Blocks until writer comes  | Returns zero value      | Deadlock            |
| **Write** | Blocks until reader comes  | **Panic**               | Deadlock            |
| **Close** | Closes the channel         | **Panic**               | **Panic**           |