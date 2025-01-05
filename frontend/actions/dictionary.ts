"use server";

import axios from "axios";

const baseAPIUrl = process.env.NEXT_PUBLIC_API_URL! || "http://localhost:5000";

const getDictionary = async (query: string, limit: number, page: number) => {
  try {
    const data = await axios.get(
      `${baseAPIUrl}/api/v1/dictionary?page=${page}&limit=${limit}&search=${query}`,
    );
    return data.data || {};
  } catch (error) {
    const err = error as Error;
    return err.message;
  }
};

const addWordsJson = async () => {
  try {
    const words = [
      {
        term: "In Pro Per",
        definition: "Representing oneself in a court case without a lawyer.",
      },
      {
        term: "In Propria Persona",
        definition:
          'Same as "In Pro Per" – representing oneself without a lawyer.',
      },
      {
        term: "In Re",
        definition:
          "A legal term used to refer to a case or matter, often in probate or administrative law.",
      },
      {
        term: "In Rem",
        definition:
          "A lawsuit or legal action directed against property, not a person.",
      },
      {
        term: "Incest",
        definition:
          "Sexual relations between close family members, which is illegal in most countries, including India.",
      },
      {
        term: "Inchoate",
        definition:
          "Refers to something that is incomplete or not fully formed, often used in law for crimes that are in the early stages, like attempted crimes.",
      },
      {
        term: "Incidental Beneficiary",
        definition:
          "A person who benefits from a contract or agreement, even though they are not the primary party to the contract.",
      },
      {
        term: "Income",
        definition:
          "Money earned from work, investments, or business activities.",
      },
      {
        term: "Incompatible",
        definition:
          "When two things or people cannot exist or work together because they do not match or complement each other.",
      },
      {
        term: "Incompatibility",
        definition:
          "A situation where two parties (often in a marriage or partnership) cannot work together due to differences.",
      },
      {
        term: "Incompetency",
        definition:
          "When a person is not capable of handling a legal or professional responsibility, such as in the case of a mentally unfit person.",
      },
      {
        term: "Incompetent Evidence",
        definition:
          "Evidence that is not legally acceptable because it doesn’t meet certain standards or rules.",
      },
      {
        term: "Incorporate",
        definition:
          "To form a company or legal entity that is recognized by law as separate from its owners.",
      },
      {
        term: "Incorporate by Evidence",
        definition:
          "Using documents or other evidence to formally include something into a legal process or decision.",
      },
      {
        term: "Incriminate",
        definition: "To make someone appear guilty of a crime.",
      },
      {
        term: "Incumbrance",
        definition:
          "A burden or restriction on property, like a mortgage or lien.",
      },
      {
        term: "Indemnify",
        definition: "To compensate someone for harm or loss.",
      },
      {
        term: "Indenture",
        definition:
          "A legal contract, often related to employment or property agreements.",
      },
      {
        term: "Independent Contractor",
        definition:
          "A person who works for themselves and is not an employee, providing services to others under a contract.",
      },
      {
        term: "Indigent",
        definition:
          "A person who is poor and unable to afford legal representation or basic necessities.",
      },
      {
        term: "Indorsement",
        definition:
          "A signature on a document that shows approval or authorization, often seen in checks or legal agreements.",
      },
      {
        term: "Indispensable Party",
        definition:
          "A person or entity whose involvement is essential in a lawsuit for it to proceed.",
      },
      {
        term: "Infancy",
        definition:
          "The state of being a minor or under the legal age of adulthood (usually under 18 in India).",
      },
      {
        term: "Inference",
        definition:
          "A conclusion reached based on evidence and reasoning, rather than direct statements.",
      },
      {
        term: "Informed Consent",
        definition:
          "When a person is fully informed about the risks and benefits of an action and agrees to it voluntarily.",
      },
      {
        term: "Infra",
        definition: 'A legal term meaning "below" or "later in the document."',
      },
      {
        term: "Infringement",
        definition:
          "The violation of someone’s rights, such as intellectual property or patents.",
      },
      {
        term: "Inherit",
        definition:
          "To receive property, money, or assets from someone who has passed away.",
      },
      {
        term: "Injunction",
        definition:
          "A court order requiring someone to do or refrain from doing a specific act.",
      },
      {
        term: "Ingress",
        definition:
          "The right or action of entering a place, especially legally.",
      },
      { term: "Innocent", definition: "Not guilty of a crime or wrongdoing." },
      {
        term: "Insanity",
        definition:
          "A mental condition where a person is not capable of understanding the nature of their actions, which can affect legal responsibility.",
      },
      {
        term: "Insolvency",
        definition:
          "A financial state where an individual or business cannot pay off debts as they come due.",
      },
      {
        term: "Inspection of Document",
        definition:
          "The process of reviewing or examining a document, often as part of a legal case or investigation.",
      },
      {
        term: "Installment Contract",
        definition:
          "An agreement where a buyer pays for something in multiple payments over time, instead of all at once.",
      },
      {
        term: "Insured",
        definition:
          "A person or entity that has an insurance policy to protect against certain risks.",
      },
      {
        term: "Intangible Property",
        definition:
          "Assets that do not have a physical form, such as patents, trademarks, and intellectual property.",
      },
      {
        term: "Inter Alia",
        definition:
          'A Latin term meaning "among other things," used in legal documents to indicate additional information.',
      },
      {
        term: "Inter Vivos Trust",
        definition:
          "A trust that is created during the lifetime of the person who created it, rather than after their death.",
      },
      {
        term: "Interim Order",
        definition:
          "A temporary court order made while a case is ongoing, often to maintain the status quo until a final decision is made.",
      },
      {
        term: "Interlineation",
        definition:
          "The act of adding new text between the lines of a document.",
      },
      {
        term: "Interlocutory",
        definition:
          "A temporary or provisional order or decision made during the course of a legal proceeding, before the final judgment.",
      },
      {
        term: "International Law",
        definition:
          "The body of rules and principles that governs relations between countries.",
      },
      {
        term: "Intervene",
        definition:
          "When a third party enters an ongoing legal case to protect their own interests.",
      },
      {
        term: "Intestacy",
        definition:
          "When someone dies without a will, their property is distributed according to the law.",
      },
      {
        term: "Intestate",
        definition: "A person who has died without a valid will.",
      },
      {
        term: "Intoxication",
        definition:
          "Being under the influence of drugs or alcohol, which can affect a person’s mental state and legal responsibilities.",
      },
      {
        term: "Intrinsic Fraud",
        definition:
          "Fraud that directly relates to the substance or content of a document, such as false statements within the document.",
      },
      {
        term: "Inure",
        definition: "To take effect or become legally operative.",
      },
      {
        term: "Invasion of Privacy",
        definition:
          "An unlawful interference with a person’s privacy, such as unauthorized disclosure of personal information.",
      },
      {
        term: "Invest",
        definition:
          "To put money into something (like stocks, real estate, or a business) with the expectation of gaining a return.",
      },
      {
        term: "Investment",
        definition:
          "The action or process of putting money into something for profit, such as stocks or property.",
      },
      {
        term: "Invitee",
        definition:
          "A person who is invited onto someone’s property for a business purpose and is owed a certain level of care by the property owner.",
      },
      {
        term: "Involuntary",
        definition:
          "Something done without intent or control, such as involuntary actions or involuntary bankruptcy.",
      },
      {
        term: "Ipso Facto",
        definition:
          'A Latin term meaning "by the fact itself," used to indicate something that is a direct result of an action or event.',
      },
      {
        term: "Irrelevant",
        definition:
          "Information or facts that are not related to the matter at hand and do not affect the outcome of a case.",
      },
      {
        term: "Irreparable Damage or Injury",
        definition:
          "Harm that cannot be fixed or undone, often used in legal cases where monetary compensation is not sufficient.",
      },
      {
        term: "Issue",
        definition: "A point or matter that is in dispute in a legal case.",
      },
      {
        term: "Inverse Condemnation",
        definition:
          "When a property owner seeks compensation for damage caused by government action, like land use for public projects.",
      },
      {
        term: "Insider Trading",
        definition:
          "The illegal practice of trading stocks or other securities based on non-public information.",
      },
      {
        term: "Interlocutory Judgment",
        definition:
          "A temporary judgment made before the final ruling in a case, often used for urgent matters.",
      },
      {
        term: "Interrogatories",
        definition:
          "Written questions that one party sends to the other, which must be answered as part of the discovery process in a legal case.",
      },
      {
        term: "Interlocutory Proceedings",
        definition:
          "Temporary legal proceedings or orders made during the course of a case before a final decision is reached. In Indian law, this is used to manage urgent matters during ongoing litigation.",
      },
    ];

    const dataToSend = words.map((word) => {
      return {
        word: word.term,
        meaning: word.definition,
      };
    });
    const data = await axios.post(
      `${baseAPIUrl}/api/v1/admin/upload-words`,
      dataToSend,
    );
    return data.data || {};
  } catch (error) {
    const err = error as Error;
    return err.message;
  }
};

export { getDictionary, addWordsJson };
