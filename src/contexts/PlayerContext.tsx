import {createContext, useState, ReactNode} from 'react';


interface Episode{
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;

}

interface PlayerContextData {
    episodeList: Array<Episode>;
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    play: (episode: Episode) => void;
    playList: (list: Array<Episode>, index: number) => void;
    togglePlay : () => void;
    toggleLoop : () => void;
    toggleShuffle : () => void;
    setPlayingState : (state : boolean) => void;
    playNext: () => void;
    playPrevious: () => void;
    hasPrevious : boolean;
    hasNext: boolean;
    isShuffling: boolean;
    clearPlayerState: () => void;
    

};

export const PlayerContext = createContext({} as PlayerContextData) 
// as PlayerContextData == {episodeList: [],currentEpisodeIndex:0});

interface PlayerContextProviderProps  {
    children: ReactNode ;
}


export function PlayerContextProvider({children } : PlayerContextProviderProps){
    const [episodeList, setEpisodelist] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    

  
    const play = (episode : Episode)=>{
      setEpisodelist([episode])
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
    }
  
    const togglePlay = () =>{
      setIsPlaying(!isPlaying);
    }

    const toggleLoop = () =>{
        setIsLooping(!isLooping);

      }
    const toggleShuffle = () =>{
        setIsShuffling(!isShuffling);

    }


  
    const setPlayingState = (state : boolean) =>{
      setIsPlaying(state);
    }

    const playList = (list: Episode[], index: number) =>{
        setEpisodelist(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    const clearPlayerState = () => {
        setEpisodelist([]);
        setCurrentEpisodeIndex(0);
    }

    const hasPrevious = currentEpisodeIndex > 0
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length
  
    function playNext() {
      if(isShuffling) {
        const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length) //Math.floor arredonda para um número inteiro menor
        
        setCurrentEpisodeIndex(nextRandomEpisodeIndex)
      } else if(hasNext){
        setCurrentEpisodeIndex(currentEpisodeIndex + 1)
      }
    }
  
    function playPrevious() {
      if (hasPrevious){} {
        setCurrentEpisodeIndex(currentEpisodeIndex - 1)
      }
    }
    
    return (
      <PlayerContext.Provider value={{currentEpisodeIndex,
                episodeList,
                toggleShuffle,
                play, 
                isPlaying , 
                togglePlay, 
                setPlayingState,
                playList,
                playNext,
                playPrevious,
                hasPrevious,
                hasNext,
                toggleLoop,
                isLooping,
                isShuffling,
                clearPlayerState,
                }}>
          {children}
        </PlayerContext.Provider >)


}