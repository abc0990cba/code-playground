import replace from 'gulp-replace' // Find and replace.
import plumber from 'gulp-plumber' // Error handling.
import notify from 'gulp-notify' // Messages (tips)
import browserSync from 'browser-sync' // Local server.
import newer from 'gulp-newer' // Check updates.
import ifPlugin from 'gulp-if' // Conditional branching

export const plugins = {
  replace,
  plumber,
  notify,
  browserSync,
  newer,
  if: ifPlugin
}