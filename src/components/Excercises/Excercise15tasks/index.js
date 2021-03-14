/* tasks incapsulated in each file */
import find_multiple_number from './find_multiple_number.js'
import reversed_words from './reversed_words.js'
import repeating_characters from './repeating_characters.js'
import phone_number from './phone_number.js'
import unique_number from './unique_number.js'

let _ = find_multiple_number;
_ = reversed_words;
_ = repeating_characters;
_ = phone_number;
_ = unique_number;

let tasksTemplates = [
  {
    ...find_multiple_number
  },
  {
    ...reversed_words
  },
  {
    ...repeating_characters
  },
  {
    ...phone_number
  },
  {
    ...unique_number
  }
]

export default tasksTemplates