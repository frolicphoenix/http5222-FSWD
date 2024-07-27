import {useState} from "react";
import Studios from "./Studios";


var studiosArray = [
    {
        number: "#1",
        image: "https://animost.com/wp-content/uploads/2023/10/best-animation-studio-for-anime-1-1024x576.jpg",
        title: "Studio Ghibli",
        desc: "Studio Ghibli is the best animation studio for anime founded in 1985 by Hayao Miyazaki and Isao Takahata. The studio is known for its hand-drawn animation, complex characters, and stories that often deal with environmental themes and the power of the human spirit.",
        prod: "Spirited Away, My Neighbor Totoro, Princess Mononoke, Howl’s Moving Castle, Kiki’s Delivery Service"
    },
    {
        number: "#2",
        image: "https://animost.com/wp-content/uploads/2023/10/best-animation-studio-for-anime-2-1024x671.jpg",
        title: "Madhouse",
        desc: "Madhouse Studio is one of the oldest Japanese anime studios, having been established in 1972 by Osamu Dezaki, Rintaro, Yoshiaki Kawajiri, and Masao Maruyama, 4 skilled animators who had previously all worked at Osamu Tezuka’s Mushi Production Studio.",
        prod: "Perfect Blue, Paprika, Millennium Actress, Tokyo Godfathers,Death Note, One-Punch Man, Claymore, Cardcaptor Sakura"
    },
    {
        number: "#3",
        image: "https://animost.com/wp-content/uploads/2023/10/best-animation-studio-for-anime-3-1024x576.jpg",
        title: "Kyoto Animation",
        desc: "Founded in 1981 by the visionary couple Yoko and Hideaki Hatta, Kyoto Animation stands as a venerable institution in the world of anime production. The studio derives its name from the culturally rich Kyoto Prefecture, which it calls home.",
        prod: "Violet Evergarden, The Melancholy of Haruhi Suzumiya, Free!, Clannad, A Silent Voice"
    },
    {
        number: "#4",
        image: "https://animost.com/wp-content/uploads/2023/10/best-animation-studio-for-anime-4-1024x576.jpg",
        title: "Studio Pierrot",
        desc: "Established in the year 2000 by former employees of TMS Entertainment’s Telecom Animation Film division, Ufotable may be a relatively recent addition to the anime scene, but it has already left an indelible mark.",
        prod: "Demon Slayer: Kimetsu no Yaiba, God Eater, the Fate/stay franchise"
    },
    {
        number: "#5",
        image: "https://animost.com/wp-content/uploads/2023/10/best-animation-studio-for-anime-5-1024x513.jpg",
        title: "Studio Bones",
        desc: "Studio Bones, founded in 1998 by industry veterans Masahiko Minami, Hiroshi Osaka, and Toshihiro Kawamoto, emerged from the roots of Sunrise Inc.",
        prod: "Cowboy Bepop: Movie, Fullmetal Alchemist, Mob Psycho 100, My Hero Acedemia"
    },
    {
        number: "#6",
        image: "https://animost.com/wp-content/uploads/2023/10/best-animation-studio-for-anime-6-1024x576.jpg",
        title: "WIT Studio",
        desc: "WIT Studio, a subsidiary of Production I.G, maybe a newcomer in the realm of Japanese anime, but its rapid ascent has left an indelible mark.",
        prod: "Attack on Titan, Vinland Saga, Kabaneri of the Iron Fortress, The Ancient Magus’ Bride"
    },
    {
        number: "#7",
        image: "https://external-preview.redd.it/qjhT70Qhh6zwANtuh_IKq7lYRoLmkZflRXMcGLhBt4Y.jpg?auto=webp&s=ef55906d4cb30210f5f511ab49d286f01db98c71",
        title: "MAPPA",
        desc: "Founded in 2011 by industry veteran Masao Maruyama, MAPPA Studio (short for Maruyama Animation Project Produce Association) emerged as a beacon of creative freedom in the anime world.",
        prod: "Yuri!! On Ice, Banana Fish, Jujutsu Kaisen, The final season of Attack on Titan"
    },
    {
        number: "#8",
        image: "https://animost.com/wp-content/uploads/2023/10/best-animation-studio-for-anime-8.jpg",
        title: "Sunrise",
        desc: "Founded in 1972 by former employees of Mushi Production, Sunrise has evolved into a colossal presence within the anime industry. With over 10 sub-studios under its banner, Sunrise has achieved recognition as one of the largest anime studios in history.",
        prod: "Gundam series, Cowboy Bebop, Outlaw Star"
    },
    {
        number: "#9",
        image: "https://animost.com/wp-content/uploads/2023/10/best-animation-studio-for-anime-9.jpg",
        title: "Toei Animation",
        desc: "Toei Animation is a venerable institution in the world of Japanese animation, with a history dating back to its founding in 1948 as Japan Animated Films. In 1956, it was acquired by Toei Company and renamed Toei Doga in Japan and Toei Animation internationally. Later, in 1998, Toei Doga also officially adopted the name Toei Animation worldwide.",
        prod: "Dragon Ball Z, Sailor Moon, One Piece"
    },
    {
        number: "#10",
        image: "https://i0.wp.com/www.kearipan.com/wp-content/uploads/2021/08/top-5-anime-studio-trigger.jpg",
        title: "Studio Trigger",
        desc: "In just over a decade, Studio Trigger has etched its name in the annals of anime history as a studio renowned for its distinctive style and creative flair. Established in 2011 by former Gainax talents Hiroyuki Imaishi and Masahiko Otsuka, Trigger wasted no time in making its mark.",
        prod: "Gurren Lagann, Darling in the Franxx, Kill la kill, Little Witch Academia"
    }
];


export default function StudioList() {

    const [StudioList, setStudioList] = useState(studiosArray);

    return (
        <div className='image-gallery-section'>
            <h2>Top 10 list</h2>
            <div className='gallery'>
                {
                StudioList.map((m) => (
                    <Studios
                        key={m.number + m.title}
                        number={m.number}
                        title={m.title}
                        image={m.image}
                        desc={m.desc}
                        prod={m.prod}
                    />
                ))
                }
            </div>
            
        </div>
    );
}


// function handleForm(e) {
//     e.preventDefault(); 
    
//     let newStudio = {
//         title: e.target.title.value,
//         descripton: e.target.description.value,
//         productions: e.target.productions.value
//     };
    
//     setStudioList([
//     ...StudioList,
//     newStudio
//     ]);
//     }

// return (
//     <div>
//         <form onSubmit={handleForm}>
//             <label htmlFor="title">Studio name:</label>
//             <input type="text" id="title" name="title" />

//             <label htmlFor="description">Description:</label>
//             <input type="text" id="description" name="description" />

//             <label htmlFor="productions">Productions:</label>
//             <input type="text" id="productions" name="productions" />

//             <button type="submit">Add</button>
//         </form>