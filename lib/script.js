const namespace = 'org.library'


/** 
 * The borrow transaction
 * @param {org.library.Borrow} input
 * @transaction  
*/
async function borrow(input) {
    const { college, certificate , timestamp } = input
    if (certificate.status === 'AVAILABLE'  ){
        certificate.status='CLGBORROWED'
        certificate.borrower = college
        certificate.borrowedTime = timestamp

        const certificateRegistry = await getAssetRegistry (`${namespace}.Certificate`)
        await certificateRegistry.update(certificate)
    }
}

/** 
 * The borrow transaction
 * @param {org.library.Borrow2} input
 * @transaction  
*/
async function borrow2(input) {
     const { student, certificate , timestamp } = input
    if (certificate.status === 'AVAILABLE' ) 
    throw new Error('Certificate does not issued by college');
  else { 
   
    certificate.status='STDBORROWED'
       certificate.borrower2 = student
       certificate.borrowed2Time = timestamp
     const studentRegistry = await getParticipantRegistry(`${namespace}.Student`)
       const certificateRegistry = await getAssetRegistry (`${namespace}.Certificate`)
       await certificateRegistry.update(certificate)
        student.balance -= certificate.originalPrice
    await studentRegistry.update(student)
}

}



/** 
 * The payment transaction
 * @param {org.library.Payment} input
 * @transaction 
 * 
 * 
*/
async function payment(input) {
    const { student , amount } = input
  
 
    const studentRegistry = await getParticipantRegistry(`${namespace}.Student`)
  
    student.balance += amount
  
    await studentRegistry.update(borrower)
}
/** 
 * The payment transaction
 * @param {org.library.AddDemo} setup
 * @transaction 
 * 
 * 
*/
async function setup (setup){
    const factory = getFactory()
    //add college
    const collegeRegistry =await getParticipantRegistry(`${namespace}.College`)
    const college1 = factory.newResource(namespace,'College','000003')
  college1.name ='Rims'
  college1. address='Rourkela'
  college1.mobile ='8249362031'
  college1.email='rimsedu@gmail.com'
  college1.course = 'MCA'
  college1.university = 'BPUT'
  const college2 = factory.newResource(namespace,'College','000004')
  college2.name ='Muncipal college'
  college2. address='Rourkela'
  college2.mobile ='8777568915'
  college2.email='muncipal165@gmail.com'
  college2.course = 'MCA'
  college2.university = 'SAmabalpur University'
  await collegeRegistry.addAll([college1, college2])

 
//add student
const studentRegistry =await getParticipantRegistry(`${namespace}.Student`)
    const student = factory.newResource(namespace,'Student','MCA001')
     student.name ='Biplab'
     student.address = 'Chhend'
     student.mobile ='9078548963'
     student.email = 'biplabswain9@gmail.com'
     student.college = 'RIMS'
     student.course = 'MCA'
     student.balance = 0
     
await studentRegistry.add(student)
//add certificate
const certificateRegistry = await getAssetRegistry(`${namespace}.Certificate`)
const certificate1 = factory.newResource(namespace,'Certificate', '000001')
certificate1.certificatename = 'MCA'
certificate1.status = 'AVAILABLE'
certificate1.university = 'BPUT'
certificate1.studentId = 'MCA001'
certificate1.originalPrice = 1000


const certificate2 = factory.newResource(namespace,'Certificate','000002')
certificate2.certificatename = 'MCA'
certificate2.status = 'AVAILABLE'
certificate2.originalPrice = 1000
certificate2.university = 'BPUT'
certificate2.studentId = 'MCA002'
await certificateRegistry.addAll([certificate1, certificate2])
}