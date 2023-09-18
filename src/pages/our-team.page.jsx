import TeamMemberCard from "../components/team-member-card.component";

const teamMembersDataVets = [
  {
    name: "Lina Alienė",
    specialty: "Veterinarijos gydytoja",
    imageUrl: "./src/assets/team-members/lin-ali.jpg",
  },
  {
    name: "Tomas Lokys",
    specialty: "Veterinarijos gydytojas",
    imageUrl: "./src/assets/team-members/tom-lok.jpg",
  },
  {
    name: "Asta Lašienė",
    specialty: "Veterinarijos gydytoja",
    imageUrl: "./src/assets/team-members/ast-las.jpg",
  },
  {
    name: "Erika Labienė",
    specialty: "Veterinarijos gydytoja",
    imageUrl: "./src/assets/team-members/eri-lab.jpg",
  },
  {
    name: "Lukrecija Apašiūtė",
    specialty: "Veterinarijos gydytoja",
    imageUrl: "./src/assets/team-members/luk-apa.jpg",
  },
  {
    name: "Kęstutis Arinkus",
    specialty: "Veterinarijos gydytojas",
    imageUrl: "./src/assets/team-members/kes-ari.jpg",
  },
];

const teamMembersDataHelpers = [
  {
    name: "Kristina Valančiūtė",
    specialty: "Vet. Gydytojo padėjėja",
    imageUrl: "./src/assets/team-members/kri-val.jpg",
  },
  {
    name: "Simona Lašiūtė",
    specialty: "Vet. Gydytojo padėjėja",
    imageUrl: "./src/assets/team-members/sim-las.jpg",
  },
  {
    name: "Ramūnas Mikalauskas",
    specialty: "Vet. Gydytojo padėjėjas",
    imageUrl: "./src/assets/team-members/ram-mik.jpg",
  },
];

const teamMembersDataOther = [
  {
    name: "Karina Valečko",
    specialty: "Administratorė",
    imageUrl: "./src/assets/team-members/kar-val.jpg",
  },
  {
    name: "Martyna Sikutė",
    specialty: "Administratorė",
    imageUrl: "./src/assets/team-members/mar-sik.jpg",
  },
];

const teamMembersDataBoss = {
  name: "Rokas Valiūnas",
  specialty: "Direktorius / Vet. Gydytojas",
  imageUrl: "./src/assets/team-members/rok-val.jpg",
};

export const OurTeamPage = () => {
  return (
    <div className="our-team">
      <h2 className="page-heading">Mūsų komanda</h2>
      <main className="our-team__main">
        <div className="our-team__main-vets">
          <h3 className="our-team__main-vets-heading our-team__main-heading">
            Veterinarijos gydytojai
          </h3>
          <div className="our-team__main-vets-box our-team__main-box">
            {teamMembersDataVets.map((member) => {
              return (
                <TeamMemberCard
                  name={member.name}
                  specialty={member.specialty}
                  imageAlt={member.name}
                  imageUrl={member.imageUrl}
                  key={member.name}
                />
              );
            })}
          </div>
        </div>
        <div className="our-team__main-helpers">
          <h3 className="our-team__main-helpers-heading our-team__main-heading">
            Veterinarijos gydytojų padėjėjai
          </h3>
          <div className="our-team__main-helpers-box our-team__main-box">
            {teamMembersDataHelpers.map((member) => {
              return (
                <TeamMemberCard
                  name={member.name}
                  specialty={member.specialty}
                  imageAlt={member.name}
                  imageUrl={member.imageUrl}
                  key={member.name}
                />
              );
            })}
          </div>
        </div>
        <div className="our-team__main-other">
          <h3 className="our-team__main-other-heading our-team__main-heading">
            Kiti darbuotojai
          </h3>
          <div className="our-team__main-other-box our-team__main-box">
            {teamMembersDataOther.map((member) => {
              return (
                <TeamMemberCard
                  name={member.name}
                  specialty={member.specialty}
                  imageAlt={member.name}
                  imageUrl={member.imageUrl}
                  key={member.name}
                />
              );
            })}
          </div>
        </div>
        <div className="our-team__main-boss">
          <h3 className="our-team__main-boss-heading our-team__main-heading">
            Direktorius
          </h3>
          <div className="our-team__main-boss-box our-team__main-box">
            <TeamMemberCard
              name={teamMembersDataBoss.name}
              specialty={teamMembersDataBoss.specialty}
              imageAlt={teamMembersDataBoss.name}
              imageUrl={teamMembersDataBoss.imageUrl}
              key={teamMembersDataBoss.name}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default OurTeamPage;
