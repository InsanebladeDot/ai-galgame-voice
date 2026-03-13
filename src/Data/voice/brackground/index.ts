import solfa_peace_of_mind from '@/assets/voice/background/solfa - peace of mind.mp3'
import solfa_lost from '@/assets/voice/background/solfa - lost.mp3'
import solfa_Remember from '@/assets/voice/background/solfa,nao - 回想.mp3'

export interface Background {
    name: string,
    src: string,
    description:string
}
export const  Remember = {
    name: '回想',
    src: solfa_Remember,
    description: '回忆'
}
export const PeaceOfMind = {
    name: 'Peace of Mind',
    src: solfa_peace_of_mind,
    description: '平静'
}
export const Lost = {
    name: 'Lost',
    src: solfa_lost,
    description: '迷失'
}

export const backgroundList: Background[] = [PeaceOfMind, Lost, Remember]