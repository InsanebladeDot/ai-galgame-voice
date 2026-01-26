import Right_Down from '@/assets/Roles/Feng-Yu/右手向下.png'
import Right_Dance_Gracefully from '@/assets/Roles/Feng-Yu/右手轻舞.png'
import Gesture_Y from '@/assets/Roles/Feng-Yu/右手向下.png'
import Contemplate from '@/assets/Roles/Feng-Yu/沉思.png'
import Speaking_Right_hand_supporting from '@/assets/Roles/Feng-Yu/说话_右手托举.png'
import Speaking_Right_hand_supporting_left_Hold_down from '@/assets/Roles/Feng-Yu/说话_右手托举_左手放下.png'
import type { Character } from '@/types/Story'

export const Feng_Yu_posture: string[] = [
  Right_Down,
  Right_Dance_Gracefully,
  Gesture_Y,
  Contemplate,
  Speaking_Right_hand_supporting,
  Speaking_Right_hand_supporting_left_Hold_down,
]

export const Feng_Yu : Character= {
  id: 'Feng_Yu',
  name: 'Feng_Yu',
  displayName: '丛雨',
  color: '#4fc3f7',
  avatar: '/avatars/hoshiori.png',
  live2d:Feng_Yu_posture
}