import { Feng_Yu_posture } from '@/stores/image/Pose/Feng_Yu'
import { nene, luca, yu, sherry } from '@/stores/image/Roles'
import type { Partner } from '@/types/Roles'
import type { Character } from '@/types/Story'

export const rolesDefault: Partner[] = [
    { id: 'sherry', name: '橘雪莉', img: sherry },
    { id: 'cong', name: '丛雨', img: yu },
    { id: 'nene', name: '绫地宁宁', img: nene },
    { id: 'luca', name: '辉夜 露卡', img: luca },
    { id: '5', name: '亚托莉', img: luca },
    { id: '6', name: '流萤', img: luca }
]

export const Orange_Sherry : Character= {
  id: 'Orange_Sherry',
  name: 'Orange-Sherry',
  displayName: '橘雪梨',
  color: '#4fc3f7',
  avatar: sherry,
  live2d: Feng_Yu_posture,
}


export const Feng_Yu : Character= {
  id: 'Feng_Yu',
  name: 'Feng-Yu',
  displayName: '丛雨',
  color: '#4fc3f7',
  avatar: yu,
  live2d: Feng_Yu_posture,
}

export const Ayachi_Nene : Character= {
  id: 'Ayachi_Nene',
  name: 'Ayachi-Nene',
  displayName: '绫地宁宁',
  color: '#4fc3f7',
  avatar: nene,
  live2d: Feng_Yu_posture,
}

export const Hinako_Luca : Character= {
  id: 'Hinako_Luca',
  name: 'Hinako-Luca',
  displayName: '辉夜 露卡',
  color: '#4fc3f7',
  avatar: luca,
  live2d: Feng_Yu_posture,
}

//默认角色
export const Default_Roles : Character[] = [
  Orange_Sherry,Feng_Yu,Ayachi_Nene,Hinako_Luca
]