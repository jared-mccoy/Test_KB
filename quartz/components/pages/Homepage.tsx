import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { Search, Graph } from "../"
import { defaultOptions as graphOptions} from "../Graph"
import { extractFilename } from "../scripts/util"


export const content: Record<string, any> = {
  meta: {
      charset: "utf-8",
      httpEquiv: "X-UA-Compatible",
      viewport: "width=device-width, initial-scale=1.0",
      description: "Knowledge - Depth",
      keywords: "technology, humanities, knowledge, infrastructure, philosophy, technology",
      author: "Jared McCoy",
      title: "Surface / Scholar",
      og: {
        title: "",
        image: "",
        url: "",
        siteName: "",
        description: "",
      },
      twitter: {
        title: "",
        image: "",
        url: "",
        card: "",
      },
  },
  links: {
    favicon: "favicon.ico",
    googleFont: "https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;700&display=swap",
    animateCSS: "Test_KB/homepage/css/animate.css",
    icomoonCSS: "Test_KB/homepage/css/icomoon.css",
    lineIconsCSS: "Test_KB/homepage/css/simple-line-icons.css",
    bootstrapCSS: "Test_KB/homepage/css/bootstrap.css",
    styleCSS: "Test_KB/homepage/css/style.css",
  },
  scripts: {
  /*   modernizr: "Test_KB/homepage/js/modernizr-2.6.2.min.js", */
    jquery: "Test_KB/homepage/js/jquery.min.js",
    jqueryEasing: "Test_KB/homepage/js/jquery.easing.1.3.js",
    bootstrapJS: "Test_KB/homepage/js/bootstrap.min.js",
    waypoints: "Test_KB/homepage/js/jquery.waypoints.min.js",
    stellar: "Test_KB/homepage/js/jquery.stellar.min.js",
    countTo: "Test_KB/homepage/js/jquery.countTo.js",
    mainJS: "Test_KB/homepage/js/main.js",
  },
  header: {
    home: "Home",
    services: "Services",
    project: "Project",
    //pricing: "Pricing",
    //team: "Team",
  },
  sections: {
    home: {
      id: "fh5co-home",
      image: "Test_KB/homepage/images/Surface_Scholar_Text_Desktop.png",
      background: "aesthetics / aesthesis / beauty / ugliness / algorithms / automation / searching / modeling / alienation / exclusion / exile / segregation / allegory / parable / ambiguity / uncertainty / undecidability / unreadability / aporia / apostrophe / archives / libraries / museums / databases / Adorno, Theodor W. / Benjamin, Walter / argument / disagreement / dissensus / debate / artificial intelligence / machine learning / neural nets / bibliography / birth / conception / fertility / pregnancy / bodies / embodiment / corporeality / boredom / attention / boundaries / limits / portals / horizons / business / management / corporation / causality / teleology / cinema / metacinema / citationality / intertextuality / allusion / class / wealth / poverty / codes / encryption / decryption / colonialism / empire / conditionality / subjunction / confinement / capture / escape / flight / constellations / dialectical images / contingency / accident / chance / occasion / contradiction / juxtaposition / paradox / corruption / evil / sin / cosmology / astronomy / solarity / cultivation / vulgarity / taste / cutting / incision / excision / cultural studies / dance / de Man, Paul / death / mortality / mourning / deception / manipulation / lying / fraud / deconstruction / definition / denomination / Derrida, Jacques / dialectics / digitization / interfaces / workflows / collaboration / digital humanities / discourse / conversation / dialogue / dialogism / doubles / surrogates / avatars / ecstasy / vision / revelation / epiphany / entrances / arrivals / entropy / chaos / order / patterns / erasure / effacement / deletion / ethics / morality / judgment / duty / events / happenings / encounters / evolution / Darwin, Charles / examples / exemplification / existence / ontology / metaphysics / exits / departures / eyes / faith / spirituality / religion / theology / family / parents / children / genealogy / fiction / metafiction / focalization / stream of consciousness / free indirect discourse / folds / layers / force / power / strength / fragmentation / incompleteness / freedom / autonomy / selfhood / intention / will / Freud / psychoanalysis / friendship / camaraderie / philia / furnishings / furniture / gender / masculinity / femininity / genre / convention / gesture / expression / grammar / parts of speech / graphesis / diagramming / mapping / charting / graves / crypts / monuments / guilt / confession / apology / forgiveness / excuses / Heidegger, Martin / home / hospitality / hostility / humanity / anthropology / ideology / imperatives / commands / information / data / facticity / interpretation / criticism / hermeneutics / irony / iteration / usage / jokes / laughter / humor / law / jurisprudence / crime / punishment / life / biology / genetics / light / darkness / shade / linguistics / structuralism / formalism / links / webs / networks / clouds / systems /cybernetics / liquidity / fluidity / immersion / submersion / floating / drowning / falling / flying / suspension / lists / litanies / literature / literariness / loops / feedback / circuits / spirals / arabesques / loss / lack / absence / emptiness / love / jealousy / pathos / machinery / mechanicity / madness / psychosis / neurosis / Marx / Marxism / materiality / memory / forgetting / mnemotechnics / method / praxis / program / metonymy / mimesis / description / ekphrasis / mind / consciousness / brain / cognition / mise-en-abyme / abground / music / song / money / economy / capitalism / reification / commodity fetishism / movement / transportation / mutation / distortion / deformity / monstrosity / narrative / metanarrative / nationality / nature / ecology / physis / nudity / divestment / originality / authenticity / innovation / otherness / alterity / strangeness / foreignness / exoticism / painting / drawing / palimpsests / parekbasis / metalepsis / anacoluthon / parentheses / pauses / breaks / interruptions / ellipses / perception / phenomenality / periphrasis / apophasis / litotes / personification / prosopopeia / anthropomorphism / poetry / poiēsis / politics / police / authority / control / security / positing / hypostasis / postmodernism / posture / stature / ergonomics / prediction / foreshadowing / projection / prolepsis / prefaces / pride / shame / flattery / egoity / privacy / intimacy / interiority / progress / utopia / property / ownership / authorship / copyright / piracy / publication / dissemination / reception / audience / pun / paronomasia / onomatopoeia / qualification / bracketing / questioning / interrogation / race / ethnicity / reality / realism / repetition / recurrence / return / retrospection / flashback / analepsis / risk / danger / hazard / wager / roads / paths / ways / lines / sailing / seas / ships / navigation / scholarship / pedagogy / university / secrecy / mystery / conspiracy / occultism / paranoia / self-consciousness / self-overhearing / sex / desire / eros / sickness / health / pathology / medicine / signification / reference / semiosis / singularity / social media / space / spatiality / speech / voice / language / streams / feeds / blogs / RSS / summary / synopsis / paraphrase / symbol / synecdoche / totality / syntax / hypotaxis / parataxis / tags / keywords / metadata / technology / prosthesis / theater / metatheater / thematism / autothematism / time / temporality / translation / polyglossia / trope / figure / metaphor / rhetoric / tropological excess / supplementarity / aberration / catachresis / truth / knowledge / certainty / epistemology / typography / graphemes / letters / uncanniness / unconsciousness / versions / drafts / revisions / editions / visibility / specularity / spectacle / espial / surveillance / waiting / anticipating / hoping / waste / garbage / sustainability / conservation / weaving / knitting / knots / wildness / savagery / barbarity / witness / testimony / writing / reading / textuality",
      title: "Surface / Scholar",
      description: null //`Toward a knowledge without depth`,
    },
    services: {
      //title: "Mnemotext",
      description: null,
      title: null, //"Knowledge Without Depth",
      //"Writing is the texture of memory. Technology, its unraveling.",
      gridImages: ["Test_KB/homepage/images/Obsidian_Screenshot.png"],
      counters: {
        authors: 0,
        sources: 0,
        nodes: 0
      },
      services: [
        { icon: "icon-cloud-download", title: "Quartz", description: "Static Site Generator" },
        { icon: "icon-laptop", title: "Obsidian", description: "Personal Knowledge Archive" },
        { icon: "icon-columns", title: "MongoDb", description: "Scalable Media Database" },
        { icon: "icon-gear", title: "kbMgr", description: "Robust Data Orchestration" },
      ],
    },    
    pricing: {
      title: "Plans Built For Every One",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.",
      plans: [
        {
          name: "Starter",
          price: "$7/mo",
          description: "Basic customer support for small business",
          features: ["10 projects", "20 Pages", "20 Emails", "100 Images"],
        },
        {
          name: "Regular",
          price: "$19/mo",
          description: "Basic customer support for small business",
          features: ["15 projects", "40 Pages", "40 Emails", "200 Images"],
        },
        {
          name: "Plus",
          price: "$79/mo",
          description: "Best value",
          features: ["Unlimited projects", "100 Pages", "100 Emails", "700 Images"],
        },
        {
          name: "Enterprise",
          price: "$125/mo",
          description: "For larger enterprises",
          features: ["Unlimited projects", "Unlimited Pages", "Unlimited Emails", "Unlimited Images"],
        },
      ],
    },   
    team: {
      title: "Our Staff",
      description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
      members: [
        {
          name: "Jared McCoy",
          position: "Developer / Designer / Educator",
          image: "Test_KB/homepage/images/user-1.jpg",
          description: "Building knowledge infrastructure, visualizing the intricacy of language.",
          social: [
            { icon: "icon-facebook", link: "#" },
            { icon: "icon-twitter", link: "#" },
            { icon: "icon-dribbble", link: "#" },
            { icon: "icon-github-alt", link: "#" },
          ],
        },
      
        {
          name: "Kevin Steve",
          position: "Co-Founder, Product Designer",
          image: "Test_KB/homepage/images/user-2.jpg",
          description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
          social: [
            { icon: "icon-facebook", link: "#" },
            { icon: "icon-twitter", link: "#" },
            { icon: "icon-dribbble", link: "#" },
            { icon: "icon-github-alt", link: "#" },
          ],
        },
        {
          name: "Ross Standford",
          position: "Full Stack Developer",
          image: "Test_KB/homepage/images/user-3.jpg",
          description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
          social: [
            { icon: "icon-facebook", link: "#" },
            { icon: "icon-twitter", link: "#" },
            { icon: "icon-dribbble", link: "#" },
            { icon: "icon-github-alt", link: "#" },
          ],
        },
      ],
    },
    explore: {
      title: "Projects",
      description: null,
/*         projects: [
        {
          image: "Test_KB/homepage/images/Receptive_Mindset.png",
          title: "Sensuous Certainty",
          caption: "Prototype for a Visual Exploration of Philosophical Complexity",
        },
        {
          image: "Test_KB/homepage/images/Human_as_biotech.jpg",
          title: "Human / Nature / Technics",
          caption: "Are we really more natural than the machines that define us?",
        },
        {
          image: "Test_KB/homepage/images/Scholars-at-Sea-B.webp",
          title: "Surface / Scholar",
          caption: "Art thou a scholar? Or art thou adrift?",
        },
        {
          image: "Test_KB/homepage/images/Mirrored_Constellations.webp",
          title: "Text Machines",
          caption: "Mnemotechnial Infrastructure as Exappropriation ",
        },
        {
          image: "Test_KB/homepage/images/Grasping_of_Begreifen.png",
          title: "Knowledge Infrastructure",
          caption: "From personal to collective knowledgebase",
        },
      ], */
    },
    gettingStarted: {
      image: "Test_KB/homepage/images/full_image_1.jpg",
      title: "Getting Started",
      description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia...",
      cta: "Get in touch"
    }, 
  },
  footer: {
    about: {
      title: "About Us",
      description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia...",
    },
    address: {
      title: "Our Address",
      "details": [
        //{ "icon": "icon-phone", "text": "+ 1235 2355 98" },
        { "icon": "icon-envelope", "text": "<a href='#'>info@surfacscholar.com</a>" },
        { "icon": "icon-globe2", "text": "<a href='#'>www.surfacescholar.com</a>" },
        { "icon": "icon-map-marker", "text": "Long Beach, CA" },
      ]
    },
    socialTitle: "Connect with Us", 
    social: [
      { icon: "icon-facebook", link: "#" },
      { icon: "icon-twitter", link: "#" },
      { icon: "icon-dribbble", link: "#" },
      { icon: "icon-github-alt", link: "#" },
    ],
    contactFormTitle: "Drop us a line",  
    copyright: "&copy; 2015 Twist Free Template. All Rights Reserved. Designed by FREEHTML5.co",
  },
} 

export default ((opts?: any) => {

  const HomepageComponent: QuartzComponent = (props: QuartzComponentProps) => {

    const SearchComponent = Search()
    const GraphComponent = Graph({
      ...graphOptions,
      showNavigator: false // This turns off the navigator
    });
    
    const { fileData, allFiles }: { fileData: any; allFiles: Record<string, any>[] } = props;

  
    // Filter and map allFiles to get featured pages
    const featuredPages = (allFiles)
      .filter(file => file?.frontmatter?.feature)
      .map(file => {
        const { feature_title, title, feature_sub, title_sub, feature_media} = file.frontmatter;
        const mediaPath = feature_media ? `'./[Resources]/${extractFilename(feature_media)}'` : "";
    
        return {
          image: mediaPath,
          slug: file.slug || "",
          title: feature_title || title || "",
          caption: feature_sub || title_sub || ""
        };
      });

    const metaCounters = allFiles.find(file => file.slug === "000000000000000000000000")?.frontmatter || {};
    (content.sections.services.counters as any) = {
      authors: metaCounters.count_person || 0,
      sources: metaCounters.count_work || 0,
      nodes: metaCounters.count_node || 0,
      text: metaCounters.count_text || 1
    };
    
    // Assign the featured pages to the explore section
    (content.sections.explore as any).projects = featuredPages;   
    
    return (
      <html>
        <head>
          <meta charSet={content.meta.charset} />
          <meta httpEquiv={content.meta.httpEquiv} content="IE=edge" />
          <meta
          httpEquiv="Content-Security-Policy"
          content="
            default-src 'self';
            script-src 'self' https://jared-mccoy.github.io https://cdnjs.cloudflare.com https://plausible.io;
            style-src 'self' https://fonts.googleapis.com https://jared-mccoy.github.io https://cdnjs.cloudflare.com;
            img-src 'self' https://jared-mccoy.github.io;
            connect-src 'self' https://plausible.io;
            font-src 'self' https://fonts.gstatic.com;
          "
        />
          <title>{content.meta.title}</title>
          <meta name="viewport" content={content.meta.viewport} />
          <meta name="description" content={content.meta.description} />
          <meta name="keywords" content={content.meta.keywords} />
          <meta name="author" content={content.meta.author} />
          <meta property="og:title" content={content.meta.og.title} />
          <meta property="og:image" content={content.meta.og.image} />
          <meta property="og:url" content={content.meta.og.url} />
          <meta property="og:site_name" content={content.meta.og.siteName} />
          <meta property="og:description" content={content.meta.og.description} />
          <meta name="twitter:title" content={content.meta.twitter.title} />
          <meta name="twitter:image" content={content.meta.twitter.image} />
          <meta name="twitter:url" content={content.meta.twitter.url} />
          <meta name="twitter:card" content={content.meta.twitter.card} />
          <link rel="shortcut icon" href={content.links.favicon} />
          <link href={content.links.googleFont} rel="stylesheet" />
          <link rel="stylesheet" href={content.links.animateCSS} />
          <link rel="stylesheet" href={content.links.icomoonCSS} />
          <link rel="stylesheet" href={content.links.lineIconsCSS} />
          <link rel="stylesheet" href={content.links.bootstrapCSS} />
          <link rel="stylesheet" href={content.links.styleCSS} />
        </head>
        <body data-slug='index'>
          <header role="banner" id="fh5co-header">
            <div className="fluid-container">
              <nav className="navbar navbar-default navbar-fixed-top js-fullheight">
                <div id="navbar" className="navbar-collapse js-fullheight">
                  <ul className="nav navbar-nav navbar-left">
                    {Object.entries(content.header).map(([key, value], index) => (
                      <li key={index}>
                        <a href="#" data-nav-section={key}>
                          <span>{value as string}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
              {/* Wrap SearchComponent in a custom class for homepage-specific styling */}
              <div className="Test_KB/homepage-search">
                <SearchComponent {...props} />
              </div>
            </div>
          </header>
  
        <section
          id={content.sections.home.id}
          data-stellar-background-ratio="0.5"
          className="Test_KB/homepage-section"
        >
          <div className="gradient"></div>

          <div className="background-text">
            {content.sections.home.background}
          </div>
            <div className="container">
              <div className="text-wrap">
                <div className="text-inner">
                  <div className="row">
                    <h1 className="to-animate">{content.sections.home.title}</h1>
                    {/* {content.sections.home.description && (
                      <h2 className="to-animate">{content.sections.home.description}</h2>
                    )} */}
                    <div className="col-md-8 col-md-offset-2 text-center">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


  
          {/* Services Section */}
          <section id="fh5co-services" data-section="services">
            <div className="fh5co-services">
              <div className="container">
                {/* <div className="row">
                  <div className="col-md-12 section-heading text-center">
                    <h2 className="to-animate">
                      <em>{content.sections.services.title}</em>
                    </h2>
                    <div className="row">
                      <div className="col-md-8 col-md-offset-2 subtext">
                        <h3 className="to-animate">
                          {content.sections.services.description}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div id="fh5co-counter-section" className="fh5co-counters">
                  <div className="container">
                    <div className="row to-animate">
                    {Object.entries(content.sections.services.counters).map(([label, count]: [string, unknown], index: number) => (
                      <div key={index} className="col-md-3 text-center">
                        <span
                          className="fh5co-counter js-counter"
                          data-from="0"
                          data-to={Number(count)}
                          data-speed={label === "text" ? "11000" : "5000"}  // Double speed for "text"
                          data-refresh-interval="50"
                        ></span>
                        <span className="fh5co-counter-label">
                          {label.charAt(0).toUpperCase() + label.slice(1)}  {/* Capitalize the label */}
                        </span>
                      </div>
                    ))}

                    </div>
                  </div>
                </div>
                < div className="Test_KB/homepage-graph">  
                  {/* {<SearchComponent {...props} />} */}
                  {<GraphComponent {...props} />} 
                </div>

                <div className="row">
                  <div className="services-row">
                    {content.sections.services.services.map((service:any, index:number) => (
                      <div key={index} className="service-item">
                        <i className={`${service.icon} to-animate-2`}></i>
                        <div className="fh5co-post to-animate">
                          <h3>{service.title}</h3>
                          <p>{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* <div className="row">
                  <div className="core-features">
                    {content.sections.services.gridImages.map((image, index) => (
                      <div
                        key={index}
                        className="grid2 to-animate"
                        style={{ backgroundImage: `url(${image})` }}
                      ></div>
                    ))}
                    <div className="grid2">
                      <div className="core-f">
                        <div className="row">
                          <div className="col-md-12">
                            {content.sections.services.services.map(
                              (service, index) => (
                                <div key={index} className="core">
                                  <i className={`${service.icon} to-animate-2`}></i>
                                  <div className="fh5co-post to-animate">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

              </div>
            </div>
          </section>
  
          {/* Explore Section */}
          <section id="fh5co-explore" data-section="explore">
            <div className="container">
              <div className="row">
                <div className="col-md-12 section-heading text-center">
                  <h2 className="to-animate">{content.sections.explore.title}</h2>
                  <div className="row">
                    <div className="col-md-8 col-md-offset-2 subtext to-animate">
                      <h3>{content.sections.explore.description}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fh5co-project">
              <div className="container">
                <div className="row">
                {(content.sections.explore.projects ).map((project: any, index: number) => (
                    <div key={index} className="col-md-12 text-center">
                      <div
                        className="project-grid"
                        style={{ backgroundImage: `url(${project.image})` }}
                      >
                        <div className="desc">
                          <h3>
                            {/* Dynamically set the href using project.slug */}
                            <a href={`/${project.slug}`}>{project.title}</a>
                          </h3>
                          <span>{project.caption}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
  
          {/* Team Section */}
          {/* <section id="fh5co-team" data-section="team">
            <div className="fh5co-team">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 section-heading text-center">
                    <h2 className="to-animate">{content.sections.team.title}</h2>
                    <div className="row">
                      <div className="col-md-8 col-md-offset-2 subtext">
                        <h3 className="to-animate">
                          {content.sections.team.description}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {content.sections.team.members.map((member, index) => (
                    <div key={index} className="col-md-4">
                      <div className="team-box text-center to-animate-2">
                        <div className="user">
                          <img
                            className="img-responsive"
                            src={member.image}
                            alt={member.name}
                          />
                        </div>
                        <h3>{member.name}</h3>
                        <span className="position">{member.position}</span>
                        <p>{member.description}</p>
                        // {<ul className="social-media">
                          {member.social.map((social, idx) => ( <li key={idx}>  <a href={social.link}> <i className={social.icon}></i> </a>
                            </li>))}   </ul> }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section> */}
  
          {/* Footer */}
          <footer id="fh5co-footer" role="contentinfo">
            <div className="container">
              <div className="row">
                <div className="col-md-4 to-animate">
                  <h3 className="section-title">{content.footer.about.title}</h3>
                  <p>{content.footer.about.description}</p>
                  <p
                    className="copy-right"
                    dangerouslySetInnerHTML={{
                      __html: content.footer.copyright,
                    }}
                  ></p>
                </div>
                <div className="col-md-4 to-animate">
                  <h3 className="section-title">{content.footer.address.title}</h3>
                  <ul className="contact-info">
                    {content.footer.address.details.map((detail:any, index:number) => (
                      <li key={index}>
                        <i className={detail.icon}></i>
                        <span
                          dangerouslySetInnerHTML={{ __html: detail.text }}
                        ></span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="section-title">{content.footer.socialTitle}</h3>
                  <ul className="social-media">
                    {content.footer.social.map((social:any, index:number) => (
                      <li key={index}>
                        <a href={social.link}>
                          <i className={social.icon}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-4 to-animate">
                  <h3 className="section-title">
                    {content.footer.contactFormTitle}
                  </h3>
                  <form className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name" className="sr-only">
                        Name
                      </label>
                      <input
                        type="name"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message" className="sr-only">
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows={7}
                        placeholder="Message"
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <input
                        type="submit"
                        id="btn-submit"
                        className="btn btn-send-message btn-md"
                        value="Send Message"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </footer>
  
          {/* Scripts */}
          <script src={content.scripts.jquery}></script>
          <script src={content.scripts.jqueryEasing}></script>
          <script src={content.scripts.bootstrapJS}></script>
          <script src={content.scripts.waypoints}></script>
          <script src={content.scripts.stellar}></script>
          <script src={content.scripts.countTo}></script>
          <script src={content.scripts.mainJS}></script>
        </body>
      </html>
    );

     

  }

  return HomepageComponent;
})satisfies QuartzComponentConstructor;