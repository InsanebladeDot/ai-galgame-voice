import {DialogueType,type Character, type Dialogue, type Story} from '@/types/Story/index'
import {Feng_Yu} from '@/Data/Roles/default'
import { Feng_Yu_posture } from '@/stores/image/Pose/Feng_Yu'

//背景图
import Room from '@/assets/Background/Room.jpg'
import classroom from '@/assets/Background/教室.jpg'
//音乐
 



export const starDustLibraryStory: Dialogue[] = [
  // —————— 开场：进入图书馆 ——————
  {
    id: 'scene_01',
    type: DialogueType.EVENT_SCENE,
    text: '月光下，一座由星光与书架构成的图书馆悬浮在空中。门，为你敞开着。',
    character: Feng_Yu,
    bg: Room,
    bgm: undefined,
    currentAction:Feng_Yu.avatar,
    skippable: false
  },

  {
    id: 'Feng_Yu_01',
    type: DialogueType.MAIN_PLOT,
    text: '欢迎来到星屑图书馆，旅人。',
    character: Feng_Yu,
    bg: Room,
    bgm: undefined,
    currentAction:Feng_Yu.avatar,
  },

  {
    id: 'Feng_Yu_02',
    type: DialogueType.IDLE,
    text: '这里的每一本书，都是一个“本该发生却未被讲述”的故事。而今晚……我想请你帮一个故事找到它的结局。',
    character: Feng_Yu,
    currentAction: Feng_Yu_posture[0], // 或根据索引/键名选择具体姿势
    bg: Room,
    bgm: undefined,
  },

  // —————— 第一次选择 ——————
  {
    id: 'choice_01',
    type: DialogueType.CHOICE,
    text: '你愿意听这个故事吗？',
    character: Feng_Yu,
    currentAction: Feng_Yu_posture[1], // 或根据索引/键名选择具体姿势
    bg: Room,
    bgm: undefined,
    options: [
      {
        id: 'opt_accept',
        text: '当然，我很好奇。',
        nextId: 'story_begin',
        effects: { affection: 5 }
      },
      {
        id: 'opt_hesitate',
        text: '……这听起来有点奇怪。',
        nextId: 'Feng_Yu_reassure'
      }
    ]
  },

  // —————— 路线：犹豫 → 安抚 ——————
  {
    id: 'Feng_Yu_reassure',
    type: DialogueType.IDLE,
    text: '别担心。故事不会伤害你……它只是需要一个倾听者。',
    character: Feng_Yu,
    currentAction: Feng_Yu_posture[2], // 或根据索引/键名选择具体姿势
    bg: Room,
    bgm: undefined,
  },
  {
    id: 'forced_choice',
    type: DialogueType.CHOICE,
    text: '那么，现在愿意听了吗？',
    character: Feng_Yu,
    currentAction: Feng_Yu_posture[3], // 或根据索引/键名选择具体姿势
    bg: Room,
    bgm: undefined,
    options: [
      { id: 'opt_yes', text: '好吧，我听。', nextId: 'story_begin' }
    ]
  },

  // —————— 故事开始：回忆片段 ——————
  {
    id: 'story_begin',
    type: DialogueType.FLASHBACK,
    text: '很久以前，在一座被遗忘的小镇上，有个女孩每天都在车站等待一个人……',
    character: Feng_Yu,
    currentAction: Feng_Yu_posture[3], // 或根据索引/键名选择具体姿势
    effects: ['fade_in'],
    bg: classroom,
    bgm: undefined,
  },

  {
    id: 'monologue_wait',
    type: DialogueType.MONOLOGUE,
    text: '*（雨滴落在空荡的长椅上，她手中的信早已泛黄。）*',
    character: Feng_Yu,
    currentAction: Feng_Yu_posture[3], // 或根据索引/键名选择具体姿势
    bg: classroom,
    bgm: undefined,
  },

  // —————— 关键选择：干预 or 默默离开 ——————
  {
    id: 'choice_02',
    type: DialogueType.CHOICE,
    text: '作为旁观者，你会怎么做？',
    character: Feng_Yu,
    currentAction: Feng_Yu_posture[4], // 或根据索引/键名选择具体姿势
    bg: classroom,
    bgm: undefined,
    options: [
      {
        id: 'opt_intervene',
        text: '走上前，问问她在等谁。',
        nextId: 'ending_kind',
        effects: { flags: ['intervened'] }
      },
      {
        id: 'opt_leave',
        text: '默默离开，不打扰她的等待。',
        nextId: 'ending_silent',
        effects: { flags: ['left_silently'] }
      }
    ]
  },

  // —————— 结局 A：温柔干预 ——————
  {
    id: 'ending_kind',
    type: DialogueType.SECRET_ROUTE,
    text: '“他在战争中牺牲了。”\n你轻声说出了真相——那是她一直不敢面对的事实。\n她哭了，但终于放下了那封永远寄不出的信。',
    character: Feng_Yu,
    currentAction: Feng_Yu_posture[5], // 或根据索引/键名选择具体姿势
    bg: classroom,
    bgm: undefined,
  },

  // —————— 结局 B：沉默守护 ——————
  {
    id: 'ending_silent',
    type: DialogueType.MAIN_PLOT,
    text: '你转身离去。多年后，人们在车站发现了一尊雕像——一位少女，永远望向远方的铁轨。',
    character: Feng_Yu,
    bg: classroom,
    bgm: undefined,
  },

  // —————— 尾声：回到图书馆 ——————
  {
    id: 'epilogue',
    type: DialogueType.EVENT_SCENE,
    text: '星织合上书本，星光在她指尖流转。\n“谢谢你，让这个故事终于有了回响。”',
    character: Feng_Yu,
    currentAction: Feng_Yu_posture[5], // 或根据索引/键名选择具体姿势
    bg: classroom,
    bgm: undefined,
  },

  {
    id: 'final_monologue',
    type: DialogueType.MONOLOGUE,
    text: '*（你走出图书馆，回头望去——它已化作漫天星屑，消散在夜空。）*',
    character: Feng_Yu,
    currentAction: Feng_Yu_posture[5], // 或根据索引/键名选择具体姿势
    bg: classroom,
    bgm: undefined,
  }
];


export const startDustLibraryStory: Story = {
  id: '0',
  title: '星屑图书馆',
  dialogues: starDustLibraryStory
}

export { DialogueType };  export type { Character };

