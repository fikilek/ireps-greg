import { getUidFromPo } from "../utils/utils"
import { useDocument } from "./useDocument";

export const useGetUser = ({ po, signatureName }) => {
  // console.log(`po`, po)
  // console.log(`signatureName`, signatureName);
  const uid = getUidFromPo({ po, signatureName })
  // console.log(`uid`, uid);
  const { error, document: user } = useDocument("users", uid);
  return {error, user }
}