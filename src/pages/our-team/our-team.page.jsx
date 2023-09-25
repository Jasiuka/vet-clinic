import TeamMemberCard from "./team-member-card.component";
import TEAM_MEMBERS_DATA from "../../data/team-members-data.json";

export const OurTeamPage = () => {
  return (
    <div className="our-team">
      <h2 className="page-heading for-observer">Mūsų komanda</h2>
      <main className="our-team__main">
        <div className="our-team__main-vets ">
          <h3 className="our-team__main-vets-heading our-team__main-heading">
            Veterinarijos gydytojai
          </h3>
          <div className="our-team__main-vets-box our-team__main-box">
            {TEAM_MEMBERS_DATA.veterinarians.map((member) => {
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
            {TEAM_MEMBERS_DATA.helpers.map((member) => {
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
            {TEAM_MEMBERS_DATA.others.map((member) => {
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
              name={TEAM_MEMBERS_DATA.director.name}
              specialty={TEAM_MEMBERS_DATA.director.specialty}
              imageAlt={TEAM_MEMBERS_DATA.director.name}
              imageUrl={TEAM_MEMBERS_DATA.director.imageUrl}
              key={TEAM_MEMBERS_DATA.director.name}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default OurTeamPage;
