// types/galgame/dialogue.ts

export enum DialogueType {
  MAIN_PLOT = 'main_plot',
  IDLE = 'idle',
  CHOICE = 'choice',
  FLASHBACK = 'flashback',
  MONOLOGUE = 'monologue',
  SYSTEM = 'system',
  EVENT_SCENE = 'event_scene',
  SECRET_ROUTE = 'secret_route',
}

export interface Character {
  id: string
  name: string
  displayName?: string
  color?: string
  avatar?: string
  live2d?: string[]
  acterDesignTerms?: string //角色设定词 用于Ai 对话
  dialog?: string
}

export interface BaseDialogue {
  id: string
  type?: DialogueType
  text: string
  character?: Character
  bgm?: string
  bg?: string
  effects?: string[]
  autoAdvance?: number
  skippable?: boolean
  currentAction?: string
  metadata?: Record<string, unknown>
}

export interface ChoiceOption {
  id: string
  text: string
  nextId: string
  condition?: string
  effects?: {
    affection?: number
    flags?: string[]
  }
}

export interface ChoiceDialogue extends BaseDialogue {
  type: DialogueType.CHOICE
  options: ChoiceOption[]
}

export type Dialogue = BaseDialogue | ChoiceDialogue
